import React from 'react';
import { useHistory } from 'react-router-dom';
import { PageContainer, EducationTileGrid } from '../../css/Div';
import { EducationTile } from '../../css/Button';
import Navigation from '../Navigation';
import market from '../../images/stock-market.png';
import news from '../../images/newspaper.png';
import invest from '../../images/investing.png';
import instrument from '../../images/tools-and-utensils.png';
import graph from '../../images/diagram.png';
import fund from '../../images/funds.png';
import { EducationIcon } from '../../css/Image';
import { PageTitle } from '../../css/Text';

const Education = () => {
    // navigate back to sign in
    const history = useHistory();
    const navigateToSite = (site) => {
        const path = `/education/${site}`;
        history.push(path);
    };

    return (
        <div>
            <Navigation />
            <PageContainer>
                <PageTitle>Education</PageTitle>
                    <EducationTileGrid>
                        <EducationTile aria-label="Navigate to what is the stock market page" onClick={() => navigateToSite("what-is-the-stock-market")}>
                            <EducationIcon src={market} alt="icon for what is the stock market" />
                            What is the Stock Market?
                        </EducationTile>
                        <EducationTile aria-label="Navigate to interpreting the news page" onClick={() => navigateToSite("interpreting-the-news-page")}>
                            <EducationIcon src={news} alt="icon for interpreting the news" />
                            Interpreting the News
                        </EducationTile>
                        <EducationTile aria-label="Navigate to why invest page" onClick={() => navigateToSite("why-invest")}>
                            <EducationIcon src={invest} alt="icon for why invest" />
                            Why Invest?
                        </EducationTile>
                        <EducationTile aria-label="Navigate to financial instruments 101 page" onClick={() => navigateToSite("financial-instruments-101")}>
                            <EducationIcon src={instrument} alt="icon for financial instruments 101" />
                            Financial Instruments 101
                        </EducationTile>
                        <EducationTile aria-label="Navigate to statistics and graphs 101 page" onClick={() => navigateToSite("statistics-and-graphs-101")}>
                            <EducationIcon src={graph} alt="icon for statistics and graphs 101" />
                            Statistics and Graphs 101
                        </EducationTile>
                        <EducationTile aria-label="Navigate to passive vs active investing page" onClick={() => navigateToSite("passive-vs-active-investing")}>
                            <EducationIcon src={fund} alt="icon for passive vs active investing" />
                            Passive vs Active Investing
                        </EducationTile>
                    </EducationTileGrid>
            </PageContainer>
        </div>
    );
};

export default Education;