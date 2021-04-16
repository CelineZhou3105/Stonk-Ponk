export const getStockDetailTooltipText = (label) => {
    switch (label) {
        case "Bid":
            return "Highest price people want to buy";
        case "Ask":
            return "Lowest price people want to sell";
        case "High":
            return "Lorem ipsum dolor sit amet, consectetur adipiscing elit";
        case "Low":
            return "Lorem ipsum dolor sit amet, consectetur adipiscing elit";
        case "Open":
            return "Lorem ipsum dolor sit amet, consectetur adipiscing elit";
        case "Close":
            return "Lorem ipsum dolor sit amet, consectetur adipiscing elit";
        case "Change":
            return "Lorem ipsum dolor sit amet, consectetur adipiscing elit";
        case "Change Percentage":
            return "Lorem ipsum dolor sit amet, consectetur adipiscing elit";
        case "52 Week Range":
            return "The lowest and highest price over the last 52 weeks";
        case "Market Cap":
            return "Lorem ipsum dolor sit amet, consectetur adipiscing elit";
        default:
            return "";
    }
}