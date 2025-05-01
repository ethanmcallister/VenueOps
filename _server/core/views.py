from django.shortcuts import render
from django.conf  import settings
import json
import os
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse 
from django.forms import model_to_dict
from core.models import Employee, CheckIn

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
    return JsonResponse({"user": model_to_dict(req.user)})

@login_required
def all_employees(req):
    employees = []
    for employee in Employee.objects.all():
        print(employee)
        employees.append(model_to_dict(employee))
    return JsonResponse({"employees": employees})

@login_required
def check_in(req):
    if req.method == "POST":
        employee = Employee.objects.get(id=req.POST.get("employee_id"))

        # create a new check-in record
        check_in = CheckIn.objects.create(
            user=employee,
            location=req.POST.get("location"),
            check_in_time=req.POST.get("check_in_time"),
            check_out_time=req.POST.get("check_out_time"),
            tasks=req.POST.get("tasks"),
        )
        check_in.save()

        # update the employee's check-in status
        employee.check_in()
        return JsonResponse({"success": True})
    else:
        return JsonResponse({"success": False})
