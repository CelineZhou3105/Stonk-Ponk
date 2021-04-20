import json
import datetime 

from django.http import HttpResponse, HttpResponseNotFound, HttpResponseBadRequest, HttpResponseForbidden, HttpResponseNotAllowed
from django.views.decorators.http import require_http_methods

from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token, refresh_jwt_token
from rest_framework_jwt.utils import jwt_decode_handler, jwt_payload_handler, jwt_encode_handler

import jwt.exceptions 

from portfolio.models import *
from .models import User
from .auth import require_token, get_user

class HttpResponseConflict(HttpResponse):
    status_code = 409

class HttpResponseUnauthorised(HttpResponse):
    status_code = 401

class HttpResponseAccepted(HttpResponse):
    status_code = 202

'''
API call to /api/account/register
Request
    email -> str
    password -> str

Response
    200 - success
    400 - bad request
    409 - email taken
'''
@require_http_methods(["POST"])
def register(request):
    try:
        body = json.loads(request.body.decode('utf-8'))
        user = User.objects.create_user(email=body["email"]
                , password=body["password"]
                , first_name=body["firstName"]
                , last_name=body["lastName"] , security_question=body["securityQuestion"]
                , security_answer=body["securityAnswer"])
        if user == None:
            return HttpResponseConflict()
        portfolio = Portfolio.objects.create(email=body["email"], last_update=datetime.date.today())
    except:
        return HttpResponseBadRequest()
    return HttpResponse()

'''
API call to /api/account/register
Request
    email -> str
    password -> str

Response
    200 - success
    400 - bad request
'''
@require_http_methods(["POST"])
def login(request):
    try:
        print("sdfsdf")
        body = json.loads(request.body.decode('utf-8'))
        email = body["email"].lower()
        password = body["password"]
        user = User.objects.get(email=email)

        if not user.check_password(password):
            return HttpResponseForbidden()

        payload = jwt_payload_handler(user)
        res = { 'token': jwt_encode_handler(payload) }
        return HttpResponse(json.dumps(res))
    except Exception as e:
        raise e
        return HttpResponseBadRequest()
    return HttpResponse()
'''
API call to /api/account/forgot_password
Request
    email   -> str
    answer  -> str
    new_password    -> str

Response
    200 - success
    400 - bad request


1. Get email
2. Send the security question
3. Send us the answer including the email
4. Check if answer matches 
5. Send a response
6. We need the new password including the email and answer
7. final response
'''

@require_http_methods(["POST"])
def forgot_password(request):
    r_email=None
    r_answer=None
    r_new_password=None
    try:
        body = json.loads(request.body.decode("utf-8"))
        r_email = body["email"]
        user = User.objects.get(email=r_email)
        r_answer = body["answer"]

        # TODO do a hash
        if user.get_security_answer() != r_answer:
            return HttpResponseUnauthorised()

        r_new_password = body["new_password"]
        user.set_password(r_new_password)
        user.save()
    except KeyError:
        if r_email == None:
            return HttpResponseBadRequest()
        if r_answer == None:
            res = {"stage": 1, "question": user.get_security_question()}
            return HttpResponseAccepted(json.dumps(res))
        if r_new_password == None:
            res = {"stage": 2}
            return HttpResponseAccepted(json.dumps(res))
        return HttpResponseBadRequest()
    except User.DoesNotExist:
        return HttpResponseNotFound()
    except Exception:
        return HttpResponseBadRequest()
    return HttpResponse()

@require_http_methods(["PUT"])
@require_token
def change_name(request):
    first_name = None
    last_name = None
    r_email = None
    try:
        user = get_user(request)
        body = json.loads(request.body.decode("utf-8"))

        first_name = body["first_name"]
        if (first_name != user.get_short_name()):
            user.first_name = first_name
            user.full_name = '%s %s' % (user.first_name, user.last_name)
        last_name = body["last_name"]
        if (last_name != user.get_last_name()):
            user.last_name = last_name
            user.full_name = '%s %s' % (user.first_name, user.last_name)

    except KeyError:
        if r_email == None:
            return HttpResponseBadRequest()
    except User.DoesNotExist:
        return HttpResponseNotFound()
    
    user.save()
    return HttpResponse()
             
    '''
    if first_name not empty
        set first_name to first_name
    if last_name not empty
        set last_name to last_name
    '''

@require_http_methods(["PUT"])
@require_token
def change_email(request):
    try: 
        body = json.loads(request.body.decode("utf-8"))
        user = get_user(request)

        old_email = user.email   
        new_email  = body["new_email"]
        if (new_email != user.email):
            
            #TODO : check that email does not exist before setting new; if does exist, then send 409 Conflict with error message
            try :
                user_2 = User.objects.get(email = new_email) 
                res = {"error": "account with this email already exists"} 
                return HttpResponseNotAllowed(json.dumps(res)) 

            except User.DoesNotExist:
                user.email = new_email
                user.save()

                portfolio = Portfolio.objects.get(email = old_email)
                portfolio.email = new_email
                portfolio.save()


        return HttpResponse()
    except:
        return HttpResponseBadRequest()

@require_http_methods(["PUT"])
@require_token
def change_password_with_auth(request):
    body = json.loads(request.body.decode("utf-8"))
    user = get_user(request)

    old_password = body["old_password"]
    new_password = body["new_password"]

    if (user.check_password(old_password)):
        user.set_password(new_password)
        user.save()
    else:
        return HttpResponseForbidden(json.dumps({"error": "incorrect password"}))

    return HttpResponse()

@require_http_methods(["GET"])
@require_token
def get_user_details(request):
    try:
        user = get_user(request)
        ret = {"first_name" : str(user.first_name), 
                "last_name" : str(user.last_name), 
                "email" : str(user.email)}
        return HttpResponse(json.dumps(ret))
    except Exception as e :
        return HttpResponseBadRequest(json.dumps({"eee": "EEEE"})) 

    return HttpResponseBadRequest() 

