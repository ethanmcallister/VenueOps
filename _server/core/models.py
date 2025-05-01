from django.db import models
from django.contrib.auth.models import AbstractUser

class Employee(AbstractUser):
    id = models.AutoField(primary_key=True)
    is_checked_in = models.BooleanField(default=False)
    phone_number = models.CharField(max_length=15, null=True, blank=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.email})"

    def check_in(self):
        self.is_checked_in = True
        self.save()
    
    def check_out(self):
        self.is_checked_in = False
        self.save()

class CheckIn(models.Model):
    id = models.AutoField(primary_key=True)
    check_in_time = models.DateTimeField(auto_now_add=True)
    check_out_time = models.DateTimeField(null=True, blank=True)
    location = models.CharField(max_length=100)
    user = models.OneToOneField(Employee, on_delete=models.CASCADE)
    tasks = models.JSONField(null=True, blank=True)
