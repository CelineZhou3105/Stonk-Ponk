from stocks import stock_api as si

def main():
    print(si.get_market_status())
    #print(si.get_stats('CBA.AX'))
    #print(si.get_quotes('CBA.AX'))
    #print(si.get_most_active(1))
    #print(si.get_market_data("most_active", 1))
    print(si.get_stock_data('AAPL'))

if __name__ == '__main__':
    main()