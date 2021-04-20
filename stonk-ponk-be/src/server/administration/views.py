from django.shortcuts import render
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseForbidden

from account.auth import require_token, get_user
from account.models import User
from .models import Administration
from django.views.decorators.http import require_http_methods

#--------- Admin Creation
@require_http_methods(["POST"])
@require_token
def make_admin(request):
    body = json.loads(request.body.decode('utf-8'))
    ret = {}
    user = get_user(request); 
    
    if (user.is_admin):
        make_user_admin(user) 
        return HttpResponseOk()
   
    return HttpResponseForbidden()

#--------- Admin Check 
@require_http_methods(["GET"])
@require_token
def check_admin(request):
    body = json.loads(request.body.decode('utf-8'))
    ret = {}
    user = get_user(request); 

    ret["is_admin"] = is_admin(user)        
    return HttpResponseOk(json.dumps(ret))

#--------- Feature Prioritisation

@require_http_methods(["PUT"])
@require_token
def get_stock_api_priority(request):
    body = json.loads(request.body.decode('utf-8'))
    ret = {}
    user = get_user(request); 
    
    if is_admin(user):
     #   ret = ApiPriority.objects.filter(user =      
        pass
    else:
        return HttpResponseForbidden()


# TODO
@require_http_methods(["PUT"])
@require_token
def set_stock_api_priority(request):
    body = json.loads(request.body.decode('utf-8'))
    ret = {}
    user = get_user(request); 
    
    if is_admin(user):
        pass
    else:
        return HttpResponseForbidden()
    


#TODO
def set_news_api_priority(request):
    body = json.loads(request.body.decode('utf-8'))
    ret = {}
    user = get_user(request); 



#TODO
def set_news_api_priority(request):
    body = json.loads(request.body.decode('utf-8'))
    ret = {}
    user = get_user(request); 


#--------- Helpers
def is_admin(user):
    try:
        Administration.objects.get(user=user)
        return True
    except Administration.DoesNotExist:
        return False 

def make_user_admin(user):
    Administration.objects.get_or_create(user=user)

#------- Exceptions
