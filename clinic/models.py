from django.db import models

# Create your models here.
class Patient(models.Model):
    name = models.CharField(max_length=99)
    phone_number = models.CharField(max_length=99)
    email = models.EmailField(max_length=99)

    def __str__(self):
        return self.name


class Doctor(models.Model):
    name = models.CharField(max_length=99)
    phone_number = models.CharField(max_length=99)
    email = models.EmailField(max_length=99)

    def __str__(self):
        return self.name


class Appointment(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    date_of_appointment = models.DateTimeField()
    status = models.CharField(max_length=99)

    def __str__(self):
        return f"{self.patient} - {self.doctor}"