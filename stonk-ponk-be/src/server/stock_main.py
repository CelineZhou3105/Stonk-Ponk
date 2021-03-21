from stocks import stock_api as si

def main():
    print(si.get_market_status())
    print(si.get_most_active())

if __name__ == '__main__':
    main()