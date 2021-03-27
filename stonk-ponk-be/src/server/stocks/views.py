from django.shortcuts import render
import json

import stock_api

from django.http import HttpResponse, HttpResponseNotFound, HttpResponseBadRequest, HttpResponseForbidden
from django.views.decorators.http import require_http_methods

from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token, refresh_jwt_token
from rest_framework_jwt.utils import jwt_decode_handler

import jwt.exceptions 
# Create your views here.

# Markets will return data on day most active stocks
@require_http_methods(["POST"])
def markets(request):
    body = json.loads(request.body.decode('utf-8'))
    
    responseData = stock_api.get_most_active()
    return JsonResponse(responseData)


@require_http_methods(["POST"])
def stock_price(request):
    try:
        body = json.loads(request.body.decode('utf-8'))
        stock_ticker = body["stockName"]
        stock_price = stock_api.get_stock_price(stock_ticker)
        responseData = stock_price.to_json()
        return JsonResponse(responseData)
    except:
        return HttpResponseBadRequest()