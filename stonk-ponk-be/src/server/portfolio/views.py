import json

from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseForbidden
from django.views.decorators.http import require_http_methods

from rest_framework_jwt.utils import jwt_decode_handler

import jwt.exceptions 

from account.models import User
from .models import Portfolio, PortfolioStock, StockOwnership, Transaction

'''
request
    empty token is in http header

response
    stocks : [
        {   name  : <string>
            ticker: <string>
            volume: <integer>
            vwap  : <float>
            first_purchase_date : <date>
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
    try:
        token = request.headers["Authorization"]
        payload = jwt_decode_handler(token)
        user = User.objects.get(id=payload["user_id"])
        portfolio = Portfolio.objects.get(email=user.email)
        holdings = StockOwnership.objects.filter(owner=portfolio)

        ret = {"stocks": []}

        for h in holdings:
            if h == None:
                print(1)
            print(h)
            # TODO we should use query set sort or make use of meta
            transactions = list(Transaction.objects.filter(stockOwnership=h))
            transactions.sort(key=lambda x : x.purchase_date)
            
            retTrans = [
                    {"uuid" : str(t.id),
                     "volume": str(t.purchase_vol),
                     "price": str(t.purchase_price),
                     "date": str(t.purchase_date)} 
                    for t in transactions]
            print(h)
            h.recalculate()

            ret["stocks"].append( 
                {
                    "name": str(h.getStockName()),
                    "ticker": str(h.getStockTicker()),
                    "volume": str(h.volume),
                    "vwap": str(h.VWAP),
                    "first_purchase_date": str(h.first_purchase),
                    "transactions": retTrans
                })
        return HttpResponse(json.dumps(ret))  
    except Exception as e:
        print(e.message)
        return HttpResponseBadRequest("portfolio details bad request")
    return HttpResponseBadRequest("portfolio details really bad request")

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



