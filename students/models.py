from django.db import models


class Student(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15, blank=True, default='')
    age = models.PositiveIntegerField(null=True, blank=True)
    address = models.CharField(max_length=255, blank=True, default='')
    course = models.CharField(max_length=100)

    def __str__(self):
        return self.name
