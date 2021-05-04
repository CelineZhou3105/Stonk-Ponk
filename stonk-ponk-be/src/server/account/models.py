from __future__ import unicode_literals

from django.db import models
from django.core.mail import send_mail
from django.core.files import File
from django.core.files.storage import FileSystemStorage
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser
from django.utils.translation import ugettext_lazy as _

from .managers import UserManager
from server import settings


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_('email address'), unique=True)
    first_name = models.CharField(_('first name'), max_length=30, blank=True)
    last_name = models.CharField(_('last name'), max_length=30, blank=True)

    security_question = models.CharField(_('security question'), default='security question',  max_length=50)
    security_answer = models.CharField(_('security answer'), default='security answer', max_length=30)

    #profile_picture = models.FileField(storage=FileSystemStorage(location=settings.MEDIA_ROOT), upload_to='account', default='account/default.img') 
    profile_picture = models.CharField(default="{}/account/default.img".format(settings.MEDIA_ROOT), max_length=255)
    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')

    def get_full_name(self):
        '''
        Returns the first_name plus the last_name, with a space in between.
        '''
        full_name = '%s %s' % (self.first_name, self.last_name)
        return full_name.strip()

    def get_short_name(self):
        '''
        Returns the short name for the user.
        '''
        return self.first_name

    def get_last_name(self):
        return self.last_name

    def email_user(self, subject, message, from_email=None, **kwargs):
        '''
        Sends an email to this User.
        '''
    def get_security_question(self):
        return str(self.security_question)

    def get_security_answer(self):
        return str(self.security_answer)
    
    def change_first_name(self, first_name):
        self.first_name = first_name
        self.full_name = '%s %s' % (self.first_name, self.last_name)

    def change_last_name(self, last_name):
        self.last_name = last_name
        self.full_name = '%s %s' % (self.first_name, self.last_name)

    def change_profile_picture(self, data):
        new_file = "{}/account/{}.img".format(settings.MEDIA_ROOT, self.id)
        with open(new_file, "w") as f:
            f.write(data)
            self.profile_picture = new_file

    def get_profile_picture(self):
        with open(self.profile_picture, "r") as f:
            return f.read().replace('\n', '')
        return ""

    def save(self, *args, **kwargs):
        self.email = self.email.lower()
        return super(User, self).save(*args, **kwargs)
