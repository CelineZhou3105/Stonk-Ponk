from django.shortcuts import render
import json

from . import stock_api

from django.http import HttpResponse, HttpResponseNotFound, HttpResponseBadRequest, HttpResponseForbidden
from django.views.decorators.http import require_http_methods

from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token, refresh_jwt_token
from rest_framework_jwt.utils import jwt_decode_handler

import jwt.exceptions 
# Create your views here.

# Markets will return data on day most active stocks
# function takes in page number indexed from 0
@require_http_methods(["POST", "GET"])
def markets(request):
    body = json.loads(request.body.decode('utf-8'))
    print(body)
    responseData = stock_api.get_market_data(body['type'], body['page_num'])
    
    return HttpResponse(responseData)


@require_http_methods(["POST", "GET"])
def stock_data(request, ticker):
    try:
        responseData = get_stock_data(ticker)
        
        return JsonResponse(responseData)
    
    except:
        return HttpResponseBadRequest("Stock Not Found")

@require_http_methods(["POST", "GET"])
def stock_prices(request, ticker, interval_type):
    try:
        responseData = get_stock_prices(ticker, interval_type)
        
        return JsonResponse(responseData)
    
    except:
        return HttpResponseBadRequest("Stock Not Found")