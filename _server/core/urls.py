from django.urls import path
from . import views

urlpatterns = [
    path('', view=views.index, name="index"),
    path('api/me', view=views.me, name="current_user"),
]
