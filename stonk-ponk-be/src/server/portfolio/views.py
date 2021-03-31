import json

from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseForbidden
from django.views.decorators.http import require_http_methods

from rest_framework_jwt.views import verify_jwt_token
from rest_framework_jwt.utils import jwt_decode_handler

import jwt.exceptions 

from .models import Portfolio, PortfolioStock, StockOwnership, Transaction

'''
request
    start : int
    end : int  [start, end)
    ordering : enum -> alphabetical, hottest lets go with alphabetical ordering for now
    empty token is in http header

response
    stocks : [
        {   name  : <string>
            ticker: <string>
            volume: <integer>
            vwap  : <float>
            first-purchase-date : <date>
            transactions : [
                uuid  : <string>
                volume: <integer>
                price : <float>
                date  : <string> # format ??? YYYY-MM-DD??
            ]
        } ...
    ]


'''

@require_http_methods(["GET"])
def details(request):
    # get the token


    # verify/match the token
    # get the portfolio object
    # get the stocks in the portfolio
    #     get the stocks in the index x to x+1
    pass

'''
request
    empty token is in http header

response
    value : <integer>
    profit: <float>
    last-access <date> #YYYY-MM-DD
'''

@require_http_methods(["GET"])
def summary(request):


    pass
'''
    stocks [
        {   name  : <name>
            ticker: <ticker>
            value : <value>
        } ...
    ]
'''
@require_http_methods(["GET"])
def best(request):
    pass

@require_http_methods(["GET"])
def worst(request):
    pass


'''
request
    {
        stockChange : [{ # this is for stock
            type : <new, delete, edit>
            ticker: <string>
            transChange : [{
                type : <new, delete, edit>
                uuid : <string> # new is null
                date : <date>
                volume:<integer>
                price: <float>
            } ...]
        } ...]
    }

response
    code from http

'''
@require_http_methods(["POST"])
def edit(request):
    pass     



