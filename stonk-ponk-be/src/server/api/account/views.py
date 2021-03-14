from django.http import HttpResponse
import json

from mongo.queryHandler import queryHandler

def index(request):
    return HttpResponse("Account")

'''
API call to /api/account/register
Request
    username -> str
    password -> str

Response
    code -> number
        0   - success
        1   - username taken
        100 - other
'''
def register(request):
    response = {"code": 100}
    if (request.method == 'POST'):
        body = json.loads(request.POST['body']);
        body['command'] = 'check'
        qh = queryHandler()
        if qh.get_func(body) == False:
            body['command'] = 'insert'
            qh.get_func(body)
            response['code'] = 0
        else:
            response['code'] = 1
    return HttpResponse(json.dumps(response))

'''
API call to /api/account/login
Request
    username ->str
    password ->

Response
    code -> number
        0   - success
        1   - username or password wrong
        100 - other 
    authToken -> str
'''
def login(request):
    response = {"code": 100}
    if (request.method == 'POST'):
        body = json.loads(request.POST['body']);
        body['command'] = 'auth'
        qh = queryHandler()
        if qh.get_func(body):
            response['code'] = 0
            response['authToken'] = "random"
        else:
            response['code'] = 1
    return HttpResponse(json.dumps(response))
