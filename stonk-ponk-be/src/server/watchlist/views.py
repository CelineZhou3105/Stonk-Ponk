from django.shortcuts import render

import json

from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseForbidden
from django.views.decorators.http import require_http_methods

from rest_framework_jwt.utils import jwt_decode_handler

import jwt.exceptions 

from account.models import User
from .models import Portfolio, PortfolioStock, StockOwnership, Transaction
from stocks import stock_api



