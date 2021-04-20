from django.db import models

from account.models import User

class Administration(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE)

class StockApiPriority(models.Model):
    name = models.CharField( max_length=30, blank=True, unique = True)
    priority = models.IntegerField(default = 0, unique = True)

class NewsApiPriority(models.Model):
    name =  models.CharField( max_length=30, blank=True, unique = True)
    priority = models.IntegerField(default = 0, unique = True)

class ForexApiPriority(models.Model):
    name =  models.CharField( max_length=30, blank=True, unique = True)
    priority = models.IntegerField(default = 0, unique = True)


# Create your models here.
