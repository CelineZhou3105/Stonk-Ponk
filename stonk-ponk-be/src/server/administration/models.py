from django.db import models

from account.models import User

class Administration(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    




# Create your models here.
