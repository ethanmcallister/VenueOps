from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout
from django.http import JsonResponse
from core.models import Employee

# Create your views here.
def sign_up(req):
    if req.method == "POST":
        password = req.POST.get("password")
        password_conf = req.POST.get("password_conf")

        if password != password_conf:
            return render(req, "registration/sign_up.html", {"password_error": "Passwords do not match"})
        if Employee.objects.filter(username=req.POST.get("email")).exists():
            return render(req, "registration/sign_up.html", {"email_error": "Email already exists"})

        employee = Employee.objects.create_user(
            username=req.POST.get("email"),
            password=req.POST.get("password"),
            email=req.POST.get("email"),
            first_name=req.POST.get("first_name"),
            last_name=req.POST.get("last_name"),
            phone_number=req.POST.get("phone_number"),
        )

        login(req, employee)
        return redirect("/")
    else:
        return render(req, "registration/sign_up.html")

def sign_in(req):
    if req.method == "POST":
        user = authenticate(req, username=req.POST.get("email"), password=req.POST.get("password"))
        if user is not None:
            login(req, user)
            return redirect("/")

        return render(req, "registration/sign_in.html")
    else:
        return render(req, "registration/sign_in.html")

def logout_view(request):
    logout(request)
    return JsonResponse({"success": True })
