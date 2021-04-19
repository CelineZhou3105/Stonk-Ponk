import requests

class AaForexApi():
    def __init__(self):
        self.num_calls = 0
    
    def get_currency_exchange(self, from_currency, to_currency):
        try:
            request_string = str("https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=" + from_currency + "&to_currency=" + to_currency + "&apikey=RYJOHTXNG0NQFQVQ")
            exchange_rate = requests.get(request_string)
            self.num_calls += 1
            return exchange_rate
        except:
            return "Incorrect Currencies"
