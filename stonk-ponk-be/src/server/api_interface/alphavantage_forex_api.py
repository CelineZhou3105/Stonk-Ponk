import requests
import json

class AaForexApi():
    def __init__(self):
        self.num_calls = 0
    
    def get_currency_exchange(self, from_currency, to_currency):
        try:
            request_string = str("https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=" + from_currency + "&to_currency=" + to_currency + "&apikey=RYJOHTXNG0NQFQVQ")
            response = requests.get(request_string)
            self.num_calls += 1
            
            if response.status_code == 200:
                values = json.loads(response.text)
                exchange_rate = values['Realtime Currency Exchange Rate']['5. Exchange Rate']
                    
                return exchange_rate

            else:
                return response.json()
        except:
            return "Incorrect Currencies"

    def get_historical_forex(self, from_currency, to_currency, given_date):
        try:
            request_string = str("https://www.alphavantage.co/query?function=FX_DAILY&from_currency=" + from_currency + "&to_currency=" + to_currency + "&apikey=RYJOHTXNG0NQFQVQ")
            response = requests.get(request_string)
            self.num_calls += 1
            
            if response.status_code == 200:
                values = json.loads(response.text)
                values_dict =  values['Time Series FX (Daily)']['5. Exchange Rate']:
                
                for date in values_dict:
                    if str(date).strip() == str(given_date).strip():
                        return date['4. close']
                    
                return 'Failed'

            else:
                return response.json()
        except:
            return "Incorrect Currencies"