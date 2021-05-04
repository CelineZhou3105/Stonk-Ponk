import React from "react";

import Navigation from "../components/Navigation";

import { PageContainer } from "../css/Div";
import { Link, PageTitle, PortfolioHealthText, SubText } from "../css/Text";

export function ContactUs() {
	return (
		<>
			<Navigation settings />
			<PageContainer>
				<PageTitle>Contact Us</PageTitle>
				<SubText>The development team:</SubText>
				<ul>
					<li>Ashwin Sarkar</li>
					<li>Celine Zhou</li>
					<li>Kevin Zhang</li>
					<li>Sampath Somanchi</li>
					<li>Rachel Liang</li>
				</ul>
				<PortfolioHealthText>
					Email us at: <Link href="mailto:stonk-ponk@gmail.com">stonk-ponk@gmail.com</Link>
				</PortfolioHealthText>
			</PageContainer>
		</>
	);
}
