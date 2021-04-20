from django.shortcuts import render
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseForbidden

from account.auth import require_token, get_user
from account.models import User
from .models import Administration
from django.views.decorators.http import require_http_methods

from api_interface.stock_api_interface import StockApiInterface
from api_interface.news_api_interface import NewsApiInterface
from api_interface.forex_api_interface import ForexApiInterface

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

@require_http_methods(["GET"])
@require_token
def get_stock_api_priority(request):
    body = json.loads(request.body.decode('utf-8'))
    ret = {} 
    user = get_user(request); 
    
    if is_admin(user):
        ret["stock_api_priorities"].append(StockApiInterface.get_ordered_stock_api_list())
    else:
        return HttpResponseForbidden()
    return HttpResponseOk(json.dumps(ret))


# TODO
@require_http_methods(["PUT"])
@require_token
def set_stock_api_priority(request):
    body = json.loads(request.body.decode('utf-8'))
    ret = {}
    user = get_user(request); 
    
    new_stock_priorities = body["new_priorities"]
    priorities = []
    if is_admin(user):
        for i in new_priorities:
            priorities.append(i.priority)
    
        if (len(priorities) > len(set(priorities))):
            return HttpResponseBadRequest()
        else:
            StockApiInterface.set_stock_api_order(new_stock_priorities)
            return HttpResponseOk()
    else:
        return HttpResponseForbidden()
    
    return HttpResponseBadRequest()


@require_http_methods(["GET"])
@require_token
def get_news_api_priority(request):
    body = json.loads(request.body.decode('utf-8'))
    ret = {} 
    user = get_user(request); 
    
    if is_admin(user):
        ret["stock_api_priorities"].append(NewsApiInterface.get_ordered_news_api_list())
    else:
        return HttpResponseForbidden()
    return HttpResponseOk(json.dumps(ret))

@require_http_methods(["PUT"])
@require_token
def set_news_api_priority(request):
    body = json.loads(request.body.decode('utf-8'))
    ret = {}
    user = get_user(request); 
    
    new_news_priorities = body["new_priorities"]
    priorities = []
    if is_admin(user):
        for i in new_priorities:
            priorities.append(i.priority)
    
        if (len(priorities) > len(set(priorities))):
            return HttpResponseBadRequest()
        else:
            NewsApiInterface.set_news_api_order(new_news_priorities)
            return HttpResponseOk()
    else:
        return HttpResponseForbidden()
    
    return HttpResponseBadRequest()


@require_http_methods(["GET"])
@require_token
def get_forex_api_priority(request):
    body = json.loads(request.body.decode('utf-8'))
    ret = {} 
    user = get_user(request); 
    
    if is_admin(user):
        ret["forex_api_priorities"].append(ForexApiInterface.get_ordered_forex_api_list())
    else:
        return HttpResponseForbidden()
    return HttpResponseOk(json.dumps(ret))

@require_http_methods(["PUT"])
@require_token
def set_forex_api_priority(request):
    body = json.loads(request.body.decode('utf-8'))
    ret = {}
    user = get_user(request); 
    
    new_forex_priorities = body["new_priorities"]
    priorities = []
    if is_admin(user):
        for i in new_priorities:
            priorities.append(i.priority)
    
        if (len(priorities) > len(set(priorities))):
            return HttpResponseBadRequest()
        else:
            ForexApiInterface.set_forex_api_order(new_forex_priorities)
            return HttpResponseOk()
    else:
        return HttpResponseForbidden()
    
    return HttpResponseBadRequest()
   
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
