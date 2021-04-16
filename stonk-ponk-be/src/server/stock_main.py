from stocks import stock_api as si
from datetime import date, datetime, timedelta

def main():
    print(si.get_stock_prices("AAPL", "last_year"))
if __name__ == '__main__':
    main()
