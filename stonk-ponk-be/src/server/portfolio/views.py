import json

from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseForbidden
from django.views.decorators.http import require_http_methods

from account.models import User
from api_interface.stock_api_interface import StockApiInterface as stock_api
from account.auth import require_token, get_user

from .metrics import calc_diversification_score, calc_profit_score, calc_volatility_score
from .suggestions import get_suggestions
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
                volume: <integer>
                price : <float>
                date  : <string> # format ??? YYYY-MM-DD??
            ]
        } ...
    ]
'''

@require_http_methods(["GET"])
@require_token
def details(request):
    # TODO also give time series
    # current price
    try:
        user = get_user(request)
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
                    "volume": h.volume,
                    "vwap": h.VWAP,
                    "price": stock_api.get_price(h.get_stock_ticker()),
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
@require_token
def summary(request):
    # TODO change %
    try:
        user = get_user(request)
        portfolio = Portfolio.objects.get(email=user.email)

        pInvestment = portfolio.get_investment()
        pValue = portfolio.get_value()
        pProfit = pValue - pInvestment
        pValueTm1 = portfolio.get_value
        pLastUpdate = str(portfolio.last_update)

        ownerships = list(portfolio.get_stock_ownerships())
        ownerships.sort(reverse=True, key=lambda x : x.VWAP * x.volume)
        ownerships = ownerships[:min(5,len(ownerships))] # get top 5

        pKeyStocks = [ {"name": so.get_stock_name(),
                        "ticker": so.get_stock_ticker(),
                        "value": stock_api.get_price(so.get_stock_ticker()) * so.volume}
                        for so in ownerships]

        ret = { "value": pValue, 
                "profit": pProfit, 
                "last_update": pLastUpdate,
                "stocks": pKeyStocks }

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
@require_token
def best(request):
    return rank(request, True)    

@require_http_methods(["GET"])
@require_token
def worst(request):
    return rank(request, False)    

def rank(request, reverse=True):
    try:
        n = int(request.GET.get("n"))

        user = get_user(request)
        portfolio = Portfolio.objects.get(email=user.email)

        profit_margins = []

        for stockOwnership in StockOwnership.objects.filter(owner = portfolio):
            profit_margins.append( 
                {
                    "name": str(stockOwnership.get_stock_name()),
                    "ticker": str(stockOwnership.get_stock_ticker()),
                    "price": stock_api.get_price(stockOwnership.get_stock_ticker()),
                    "profit_margin": stockOwnership.calc_profit_margin()
               })

        profit_margins.sort(reverse=reverse, key=lambda pm : pm["profit_margin"])
        profit_margins = profit_margins[:min(len(profit_margins), n)]
        
        ret = {"stocks" : []}
        ret["stocks"] = profit_margins
        
        return HttpResponse(json.dumps(ret))  
    except Exception as e:
        raise e
        return HttpResponseBadRequest("portfolio best bad request")
    return HttpResponseBadRequest("portfolio best really bad request")

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
@require_token
def edit(request):
    try:
        body = json.loads(request.body.decode('utf-8'))
        user = get_user(request)
        portfolio = Portfolio.objects.get(email=user.email)

        for so in portfolio.get_stock_ownerships():
            so.delete()
        #print(body)
        for s in body["stocks"]:
            ticker = s["ticker"]
            for t in s["transactions"]:
                add_result = portfolio.add_stock(ticker, t["date"], int(t["volume"]), float(t["price"]))
                
                if add_result['message'] != "Success":
                    print("Returned ", add_result)
                    return HttpResponseBadRequest(json.dumps(add_result))

        for so in portfolio.get_stock_ownerships():
            so.recalculate()
    except Exception as e:
        print(e)
        raise e
        return HttpResponseBadRequest()
    return HttpResponse()

'''
request
    empty as token is in header

response
    {
        beta_score : <number>,
        profit_score : <number>,
        volatility_score : <number>
    }
'''
@require_http_methods(["GET"])
@require_token
def metrics(request):
    try:
        user = get_user(request)
        portfolio = Portfolio.objects.get(email=user.email)

        scores = {"beta_score": 0, "profit_score": 0, "volatility_score": 0}
        suggestions = []

        if len(portfolio.get_stock_ownerships()) > 0:
            scores["beta_score"] = round(calc_diversification_score(portfolio))
            scores["profit_score"] = round(calc_profit_score(portfolio))
            scores["volatility_score"] = round(calc_volatility_score(portfolio))

            suggestions.append(get_suggestions("beta", scores["beta_score"]))
            suggestions.append(get_suggestions("profit", scores["profit_score"]))
            suggestions.append(get_suggestions("volatility", scores["volatility_score"]))
        

        responseData = {"scores": scores, "suggestions": suggestions}

        return HttpResponse(json.dumps(responseData))
    except Exception as e:
        raise e
        pass
    return HttpResponseBadRequest()
