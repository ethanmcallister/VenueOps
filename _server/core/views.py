from django.shortcuts import render
from django.conf  import settings
import json
import os
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse 
from django.forms import model_to_dict
from core.models import Employee, CheckIn
from datetime import datetime

# Load manifest when server launches
MANIFEST = {}
if not settings.DEBUG:
    f = open(f"{settings.BASE_DIR}/core/static/manifest.json")
    MANIFEST = json.load(f)

# Create your views here.
@login_required
def index(req):
    context = {
        "asset_url": os.environ.get("ASSET_URL", ""),
        "debug": settings.DEBUG,
        "manifest": MANIFEST,
        "js_file": "" if settings.DEBUG else MANIFEST["src/main.ts"]["file"],
        "css_file": "" if settings.DEBUG else MANIFEST["src/main.ts"]["css"][0]
    }
    return render(req, "core/index.html", context)

@login_required
def me(req):
    try:
        checkin_data = model_to_dict(req.user.checkin)
    except CheckIn.DoesNotExist:
        checkin_data = None

    return JsonResponse({
        "user": model_to_dict(req.user),
        "checkin": checkin_data,
    })

@login_required
def all_employees(req):
    employees = []
    for employee in Employee.objects.all():

        employee_data = model_to_dict(employee)

        try: 
            checkin = employee.checkin
            employee_data["checkin"] = model_to_dict(checkin)
        except CheckIn.DoesNotExist:
            employee_data["checkin"] = None

        employees.append(employee_data)

    return JsonResponse({"employees": employees})

@login_required
def check_in(req):
    if req.method == "POST":
        employee = Employee.objects.get(id=req.user.id)
        data = json.loads(req.body)

        # Parse time values and combine with the current date
        current_date = datetime.now().date()
        check_in_time = datetime.strptime(f"{current_date} {data.get('check_in_time')}", "%Y-%m-%d %H:%M")
        check_out_time = datetime.strptime(f"{current_date} {data.get('check_out_time')}", "%Y-%m-%d %H:%M")

        # create a new check-in record
        check_in = CheckIn.objects.create(
            employee=employee,
            location=data.get("location"),
            check_in_time=check_in_time,
            check_out_time=check_out_time,
            tasks=data.get("tasks"),
        )
        check_in.save()

        # update the employee's check-in status
        employee.check_in()
        return JsonResponse({"success": True})
    else:
        return JsonResponse({"success": False})

@login_required
def check_out(req):
    if req.method != "POST":
        return JsonResponse({"success": False})

    employee = Employee.objects.get(id=req.user.id)
    CheckIn.objects.get(employee=employee).delete()
    employee.check_out()
    
    return JsonResponse({"success": True})
