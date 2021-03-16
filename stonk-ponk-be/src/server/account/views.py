import json

from django.http import HttpResponseBadRequest, HttpResponse
from django.views.decorators.http import require_http_methods

from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token, refresh_jwt_token


from .models import User


class HttpResponseConflict(HttpResponse):
    status_code = 409

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
        user = User.objects.create_user(body["email"], password=body["password"])
        if user == None:
            return HttpResponseConflict()
    except:
        return HttpResponseBadRequest()
    return HttpResponse()

'''
API call to /api/account/login
Request
    email ->str
    password -> str

Response
    200 - success
    400 - bad request

Login is done with obtain_jwt_token 
'''

def change_password(request):
    response = {"code": 100}
    if (request.method == 'POST'):
        body = json.loads(request.POST['body'])
        body['command'] = 'replace'
        qh = queryHandler()
        if qh.get_func(body):
            response['authToken'] = "random"
        else:
            response['code'] = 1
        

