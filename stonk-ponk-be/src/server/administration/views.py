from django.shortcuts import render
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseForbidden

from account.auth import require_token, get_user
from account.models import User

@require_http_methods(["GET"])
@require_token
def check_admin(request):
    body = json.loads(request.body.decode('utf-8'))
    ret = {}
    try:
        user = get_user(request); 
        admin = Administration.objects.get(user=user)
        ret["is_admin"] = True 

    except Administration.DoesNotExist:
        ret["is_admin"] = False
            
    except PyJWTError:
        return HttpResponseForbidden()
  
    return HttpResponseOk()

# Create your views here.
