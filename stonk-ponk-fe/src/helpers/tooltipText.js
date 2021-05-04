export const getStockDetailTooltipText = (label) => {
    switch (label) {
        case "Bid":
            return "Highest price people want to buy";
        case "Ask":
            return "Lowest price people want to sell";
        case "High":
            return "The highest price the stock was traded today";
        case "Low":
            return "The lowest price the stock was traded today";
        case "Open":
            return "The opening price of the stock today";
        case "Close":
            return "The closing price of the stock on the last trading day";
        case "Change":
            return "The $ change in stock price from the last trading day";
        case "Change Percentage":
            return "The % change in stock price from the last trading day";
        case "52 Week Range":
            return "The lowest and highest price over the last 52 weeks";
        case "Market Cap":
            return "The total dollar market value of a company's outstanding shares of stock";
        default:
            return "";
    }
}