export const LoginLink = "http://localhost:8000/api/account/login";

export const RegisterLink = "http://localhost:8000/api/account/register";

export const LogoutLink = "http://localhost:8000/api/account/logout";

// Reset password flow
export const ForgotPasswordLink = "http://localhost:8000/api/account/forgot_password";

// Settings page
export const ChangeNameLink = "http://localhost:8000/api/account/change_name";
export const ChangeEmailLink = "http://localhost:8000/api/account/change_email";
export const ChangePasswordWithAuthLink = "http://localhost:8000/api/account/change_password_with_auth";
export const GetUserDetailsLink = "http://localhost:8000/api/account/get_user_details";
export const ChangeProfilePictureLink = "http://localhost:8000/api/account/change_profile_picture";
export const GetAdminLink = "";


// Portfolio Information 
export const EditPortfolio = "http://localhost:8000/api/portfolio/edit";
export const GetPortfolioSummary = "http://localhost:8000/api/portfolio/summary"; // Only for the pie chart, value, last accessed
export const GetPortfolioDetails = "http://localhost:8000/api/portfolio/details"; // Actual stocks owned
export const GetPortfolioBestStocks = "http://localhost:8000/api/portfolio/best";
export const GetPortfolioWorstStocks = "http://localhost:8000/api/portfolio/worst";
export const GetPortfolioHealth = "http://localhost:8000/api/portfolio/metrics";

// Stock API calls
export const MarketsLink = "http://localhost:8000/api/stocks/markets";
export const StockDetailLink = "http://localhost:8000/api/stocks/stock_detail";
export const StockPriceLink = "http://localhost:8000/api/stocks/historical_prices";
export const StockCheckLink = "http://localhost:8000/api/stocks/get_stock_name";

// Stock News API calls
export const StockNewsLink = "http://localhost:8000/api/news/get_news";
export const MarketNewsLink = "http://localhost:8000/api/news/get_market_news";

// Watchlist API calls
export const GetWatchlistNameLink = "http://localhost:8000/api/watchlist/get_watchlists";
export const CreateWatchlistLink = "http://localhost:8000/api/watchlist/create_watchlist";
export const DeleteWatchlistLink = "http://localhost:8000/api/watchlist/delete_watchlist";
export const GetWatchlistStockLink = "http://localhost:8000/api/watchlist/get_watchlist_stocks";
export const UpdateWatchlistLink = "http://localhost:8000/api/watchlist/save_watchlist";