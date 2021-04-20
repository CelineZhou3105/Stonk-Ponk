import React from "react";
import { Route, Redirect } from "react-router-dom";

/**
 * PrivateRoute - Wrapper around a route in the application that checks the token
 * exists before letting the user access the page. Takes the user back to the login page
 * if they are not authorised to see the page.
 * @param {ReactElement} component - component to display when the check is successful
 */
export const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={(props) => {
			const token = localStorage.getItem("token");
			if (!token) {
				// not logged in so redirect to login page with the return url
				console.log("Redirecting to login page. Summary page is a private route!");
				return <Redirect to={{ pathname: "/" }} />;
			}

			// Successful login - return component
			return <Component {...props} />;
		}}
	/>
);
