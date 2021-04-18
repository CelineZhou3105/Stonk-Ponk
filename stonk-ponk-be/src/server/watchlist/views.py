from django.shortcuts import render

import json

from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseForbidden
from django.views.decorators.http import require_http_methods

from rest_framework_jwt.utils import jwt_decode_handler

import jwt.exceptions 

from account.models import User
from account.auth import require_token, get_user
from portfolio.models import Portfolio, PortfolioStock, StockOwnership, Transaction
from stocks import stock_api
from watchlist.models import Watchlist, StockWatch

@require_http_methods(["POST"])
@require_token
def create_watchlist(request):
    body = json.loads(request.body.decode("utf-8"))
    user = get_user(request)
    name = body["watchlist_name"] 

    # how do we want to handle things that have been aleady created?
    wl = Watchlist.objects.create(user = user, name = name) 
    responseData = { "watchlist_id": wl.id }
    return HttpResponse(json.dumps(responseData))

@require_http_methods(["DELETE"])
@require_token
def delete_watchlist(request):
    body = json.loads(request.body.decode("utf-8"))
    user = get_user(request)

    watchlist_id = body["watchlist_id"]

    try:
        wl = Watchlist.objects.get(id = watchlist_id, user = user) 
        if wl.user != user:
            return HttpResponseBadRequest("you naughty naughty")
        print(wl)
        wl.delete()
    except Watchlist.DoesNotExist:
        return HttpResponseNotFound()
    
    return HttpResponse() 

@require_http_methods(["POST"])
@require_token
def save_watchlist(request):
    body = json.loads(request.body.decode("utf-8"))
    user = get_user(request)

    watchlist = body["watchlist_id"]
    
    try:
        wl = Watchlist.objects.get(id = watchlist, user = user)
        wl.save_stocks(set(body["tickers"]))
    except Watchlist.DoesNotExist:
        return HttpResponseNotFound() 
    
    return HttpResponse()    

@require_http_methods(["GET"])
@require_token
def get_watchlists(request):
    #get all watchlists associated with a user 
    user = get_user(request)
    ret = {"watchlists" : []}

    for wl in Watchlist.objects.filter(user = user):
        ret["watchlists"].append({"id" : wl.id, "name" : wl.name})

    return HttpResponse(json.dumps(ret))

@require_http_methods(["GET"])
@require_token
def get_watchlist_stocks(request):
    #given a watchlist id, return json array of stocks with relevant information
    
    body = json.loads(request.body.decode("utf-8"))
    user = get_user(request)
   
    watchlist = Watchlist.objects.get(id = body["watchlist_id"])
    if watchlist.user != user:
        return HttpResponseBadRequest("you naughty naughty")

    ret = {"tickers" : []}
    for stock in StockWatch.objects.filter(watchlist = watchlist):
        pass

    return HttpResponse(json.dumps(ret))
