import json

from django.http import HttpResponseForbidden

from rest_framework_jwt.views import obtain_jwt_token
from rest_framework_jwt.utils import jwt_decode_handler

from jwt.exceptions import PyJWTError

from .models import User

'''
called on a request route so we are wrapping a function with signature of function(request)
'''
def require_token(func):
    def inner(*args, **kwargs):
        try:
            request = args[0]
            user = get_user(request)
        except PyJWTError:
            return HttpResponseForbidden()
        return func(*args, **kwargs)
    return inner

def get_user(request):
    token = request.headers["Authorization"]
    payload = jwt_decode_handler(token)
    user = User.objects.get(id=payload["user_id"])
    return user
