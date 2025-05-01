from django.urls import path
from . import views

urlpatterns = [
    path('', view=views.index, name="index"),
    path('api/me', view=views.me, name="current_user"),
    path('api/all_employees', view=views.all_employees, name="all_employees"),
    path('api/check_in', view=views.check_in, name="check_in"),
]
