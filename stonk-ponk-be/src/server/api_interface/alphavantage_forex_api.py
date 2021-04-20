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
