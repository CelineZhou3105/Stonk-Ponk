from django.shortcuts import render
import json

from . import news_api

from django.http import HttpResponse, HttpResponseNotFound, HttpResponseBadRequest, HttpResponseForbidden
from django.views.decorators.http import require_http_methods

from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token, refresh_jwt_token
from rest_framework_jwt.utils import jwt_decode_handler

import jwt.exceptions 
# Create your views here.

@require_http_methods(["POST", "GET"])
def get_stock_news(request):
    body = json.loads(request.body.decode('utf-8'))
    print(body)
    responseData = news_api.get_news(body['ticker'])
    return HttpResponse(responseData)
