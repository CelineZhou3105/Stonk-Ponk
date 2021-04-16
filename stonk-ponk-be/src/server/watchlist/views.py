from django.shortcuts import render

import json

from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseForbidden
from django.views.decorators.http import require_http_methods

from rest_framework_jwt.utils import jwt_decode_handler

import jwt.exceptions 

from account.models import User
from .models import Portfolio, PortfolioStock, StockOwnership, Transaction
from stocks import stock_api
from watchlist.models import Watchlist, StockWatch

@require_http_methods(["POST"])
def create_watchlist(request):
    token = request.headers["Authorization"]
    payload = jwt_decode_handler(token)
    user = User.objects.get(id=payload["user_id"])

    body = json.loads(request.body.decode("utf-8"))
    r_email = body["email"]
    watchlist_name = body["watchlist_name"] 

    Watchlist.objects.create(user = user, name = watchlist_name) 

    return HttpResponse()

@require_http_methods(["DELETE"])
def delete_watchlist(request):
    token = request.headers["Authorization"]
    payload = jwt_decode_handler(token)
    user = User.objects.get(id=payload["user_id"])

    body = json.loads(request.body.decode("utf-8"))
    watchlist_id = body["watchlist_id"]

    try:
    watchlist_to_delete = Watchlists.objects.get(id = watchlist_id, user = user) 
    watchlist_to_delete.delete()

    except Watchlist.DoesNotExist:
        return HttpResponseNotFound()
    
    return HttpResponse()    

@require_http_methods(["POST"])
def add_stock_to_watchlist(request):
    token = request.headers["Authorization"]
    payload = jwt_decode_handler(token)
    user = User.objects.get(id=payload["user_id"])
    
    body = json.loads(request.body.decode("utf-8"))
    ticker = body["ticker"]
    watchlist = body["watchlist_id"]
    
    try:
        wl = Watchlist.objects.get(id = watchlist, user = user)
        wl.add_stock(ticker)
    except Watchlist.DoesNotExist:
        return HttpResponseNotFound() 
    
    return HttpResponse()    

@require_http_methods(["DELETE"])
def remove_stock_from_watchlist(request):
    token = request.headers["Authorization"]
    payload = jwt_decode_handler(token)
    user = User.objects.get(id=payload["user_id"])
    
    body = json.loads(request.body.decode("utf-8"))
    ticker = body["ticker"]
    watchlist = body["watchlist_id"]

    try:
        wl = Watchlist.objects.get(id = watchlist, user = user)
        wl.del_stock(ticker)
    except Watchlist.DoesNotExist:
        return HttpResponseNotFound() 

    return HttpResponse()    

@require_http_methods(["GET"]):
def get_watchlists(request):
    #get all watchlists associated with a user 
   
    token = request.headers["Authorization"]
    payload = jwt_decode_handler(token)
    user = User.objects.get(id=payload["user_id"])

    ret = {"watchlists" : []}
    for wl in Watchlist.objects.filter(user = user):
        ret["watchlists"].append({"id" : wl.id, "name" : wl.name})

    return HttpResponse(json.dumps(ret))

@require_http_methods(["GET"]):
def get_watchlist_stocks(request):
    #given a watchlist id, return json array of stocks with relevant information
    
    token = request.headers["Authorization"]
    payload = jwt_decode_handler(token)
    user = User.objects.get(id=payload["user_id"])
    
    body = json.loads(request.body.decode("utf-8"))
    ticker = body["ticker"]
    watchlist = Watchlist.objects.get(id = body["watchlist_id"])

    ret = {"stocks" : []}
    for stock in StockWatch.objects.filter(watchlist = watchlist):
        #append stock info here
         
