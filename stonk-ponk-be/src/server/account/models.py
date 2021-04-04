from __future__ import unicode_literals

from django.db import models
from django.core.mail import send_mail
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser
from django.utils.translation import ugettext_lazy as _

from .managers import UserManager


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_('email address'), unique=True)
    first_name = models.CharField(_('first name'), max_length=30, blank=True)
    last_name = models.CharField(_('last name'), max_length=30, blank=True)

    security_question = models.CharField(_('security question'), default='security question',  max_length=50)
    security_answer = models.CharField(_('security answer'), default='security answer', max_length=30)
        
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
