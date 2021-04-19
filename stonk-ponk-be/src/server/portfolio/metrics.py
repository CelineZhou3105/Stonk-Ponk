import math
import statistics

from api_interface.stock_api_interface import StockApiInterface as stock_api
from .models import Portfolio

def calc_diversification_score(portfolio):
    if len(portfolio.get_stock_ownerships()) == 0:
        return 0
    beta = portfolio.get_beta()
    return math.e**(-(beta-1)**2) * 100

def calc_profit_score(portfolio):
    if len(portfolio.get_stock_ownerships()) == 0:
        return 0
    # go through all the transactions and purchase the same amount
    profit_portfolio = portfolio.get_value() - portfolio.get_investment()
    profit_investment= portfolio.get_hypothetical_market_profit()
    
    if profit_investment == 0:
        return 0

    profit_normalised = profit_portfolio / profit_investment - 1

    return (math.atan(0.1*profit_normalised+1)/math.pi*2+1)*50

def calc_volatility_score(portfolio):
    if len(portfolio.get_stock_ownerships()) == 0:
        return 0

    interval_type = "last_six_months"
    market_ticker = "^GSPC"
    portfolio_values = portfolio.get_historical_value(interval_type)
    market_prices = stock_api.get_stock_prices(market_ticker, interval_type)

    portfolio_changes = []
    market_changes = []

    for i in range(1, len(portfolio_values)):
        portfolio_changes.append(portfolio_values[i]/portfolio_values[i-1]-1)

    for i in range(1, len(market_prices)):
        market_changes.append(market_prices[i]['price']/market_prices[i-1]['price']-1)
    
    portfolio_volatility = statistics.stdev(portfolio_changes)
    market_volatility = statistics.stdev(market_changes)

    adjusted_volatility = portfolio_volatility / market_volatility - 1

    return math.e**(-(adjusted_volatility**2)) * 100

