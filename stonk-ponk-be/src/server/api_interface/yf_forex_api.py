import requests
import json
import yahoo_fin.stock_info as si

class YfForexApi():
    def __init__(self):
        self.num_calls = 0
        self.api = si
    
    def get_currency_exchange(self, from_currency, to_currency):
        try:
            currencies = self.api.get_currencies()

            for index, row in currencies.iterrows():
                if row['Name'] == str(from_currency + "/" + to_currency):
                    return row['Last Price']
                
                elif row['Name'] == str(to_currency + "/" + from_currency):
                    return float(1/float(row['Last Price']))
            
            return currencies

        except:
            return "Incorrect Currencies"

    #def get_historical_forex(self, from_currency, to_currency, given_date):
    #    return 