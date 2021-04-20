import pandas as pd
import requests
import yahoo_fin.stock_info as si
import json
from datetime import date, datetime, timedelta
from dateutil.relativedelta import relativedelta
import arrow
import requests

class AaApi():
    def __init__(self):
        self.num_calls = 0
        self.api = si
    
    def get_market_status(self):
        return 


