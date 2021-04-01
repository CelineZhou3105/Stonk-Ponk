import json

from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseForbidden
from django.views.decorators.http import require_http_methods

from rest_framework_jwt.utils import jwt_decode_handler

import jwt.exceptions 

from account.models import User
from .models import Portfolio, PortfolioStock, StockOwnership, Transaction
from stocks import stock_api

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
        holdings = portfolio.get_stock_ownerships()

        ret = {"stocks": []}

        for h in holdings:
            # TODO we should use query set sort or make use of meta
            transactions = list(Transaction.objects.filter(stockOwnership=h))
            transactions.sort(key=lambda x : x.purchase_date)
            
            retTrans = [
                    {#"uuid" : str(t.id),
                     "volume": str(t.purchase_vol),
                     "price": str(t.purchase_price),
                     "date": str(t.purchase_date)} 
                    for t in transactions]

            #h.recalculate()

            ret["stocks"].append( 
                {
                    "name": str(h.get_stock_name()),
                    "ticker": str(h.get_stock_ticker()),
                    "volume": str(h.volume),
                    "vwap": str(h.VWAP),
                    "first_purchase_date": str(h.first_purchase),
                    "transactions": retTrans
                })
        return HttpResponse(json.dumps(ret))  
    except Exception as e:
        return HttpResponseBadRequest("portfolio details bad request")
    return HttpResponseBadRequest("portfolio details really bad request")

'''
request
    empty token is in http header

response
    value : <integer>
    profit: <float>
    last_update: <date> #YYYY-MM-DD
'''

@require_http_methods(["GET"])
def summary(request):
    try:
        token = request.headers["Authorization"]
        
        payload = jwt_decode_handler(token)
        user = User.objects.get(id=payload["user_id"])
        portfolio = Portfolio.objects.get(email=user.email)

        pInvestment = portfolio.get_investment()
        pValue = portfolio.get_value()
        pProfit = pValue - pInvestment
        pLastUpdate = str(portfolio.last_update)
      
        ret = { "value": pValue, "profit": pProfit, "last_update": pLastUpdate }

        return HttpResponse(json.dumps(ret))
    except Exception as e:
        print(e)
        return HttpResponseBadRequest()
    return HttpResponseBadRequest()

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
    stocks : [{   
        ticker: <string>
        transactions : [{
            volume: <integer>
            price : <float>
            date  : <string> # format ??? YYYY-MM-DD??
        } ...]
    } ...]
}

response
    code from http
'''
@require_http_methods(["POST"])
def edit(request):
    try:
        body = json.loads(request.body.decode('utf-8'))
        token = request.headers["Authorization"]
        payload = jwt_decode_handler(token)
        user = User.objects.get(id=payload["user_id"])
        portfolio = Portfolio.objects.get(email=user.email)
        for so in portfolio.get_stock_ownerships():
            so.delete()

        for s in body["stocks"]:
            ticker = s["ticker"]
            for t in s["transactions"]:
                portfolio.add_stock(ticker, t["date"], t["volume"], t["price"])
    except Exception as e:
        print(e)
        return HttpResponseBadRequest()
    return HttpResponse()
        



