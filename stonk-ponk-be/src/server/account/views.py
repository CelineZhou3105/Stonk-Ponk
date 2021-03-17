import json

from django.http import HttpResponse, HttpResponseNotFound, HttpResponseBadRequest, HttpResponseForbidden
from django.views.decorators.http import require_http_methods

from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token, refresh_jwt_token
from rest_framework_jwt.utils import jwt_decode_handler

from jwt.exceptions import InvalidSignatureError

from .models import User

@require_http_methods(["POST"])
def index(request):
    body = json.loads(request.body.decode('utf-8'))
    print(jwt_decode_handler(body["token"]))
    return HttpResponse()

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
                , last_name=body["lastName"]
                , security_question=body["securityQuestion"]
                , security_answer=body["securityAnswer"])

        if user == None:
            return HttpResponseConflict()
    except:
        return HttpResponseBadRequest()
    return HttpResponse()

'''
API call to /api/account/reset_password
Request
    token -> JWT token
    new_password -> str

Response
    200 - success
    400 - bad request

'''
@require_http_methods(["POST"])
def reset_password(request):
    body = json.loads(request.body.decode("utf-8"))
    try:
        payload = jwt_decode_handler(body["token"])
        user = User.objects.get(id=payload["user_id"])
        user.set_password(body["new_password"])
        user.save()
    except InvalidSignatureError:
        return HttpResponseForbidden()
    except:
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
