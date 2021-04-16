import React from 'react';
import Navigation from './Navigation';
import { Container, NewsContainer, PageContainer } from "../css/Div";
import { Link, NormalText, PageTitle, SubText } from "../css/Text";

function News() {
    // TODO - get articles from BE

    // const newsResponse = getNews().then(res => {
    //     return res.articles;
    // })
    // console.log(newsResponse);
    return (
        <>
            <Navigation />
            <PageContainer>
                <PageTitle>News</PageTitle>
                <Container flex_direction="column" gap="1em">
                    {articles.map(article => {
                        return (
                            <NewsContainer>
                                <img src={article.urlToImage} alt=""></img>
                                <div>
                                    <NormalText><Link color="black" href={article.url} target="_blank">{article.title}</Link></NormalText>
                                    <SubText>{article.description}</SubText>
                                </div>
                            </NewsContainer>
                        );
                    })
                    }
                </Container>
            </PageContainer>
        </>
    )
}

const articles = [
    {
        "source": {
            "id": null,
            "name": "The Guardian"
        },
        "author": "Guardian staff reporter",
        "title": "Much-feared asteroid Apophis won't hit Earth for at least 100 years, Nasa says - The Guardian",
        "description": "Chunk of space rock was once the ‘poster child for hazardous asteroids’ but it will be a while before humans need to worry about it again",
        "url": "https://amp.theguardian.com/science/2021/mar/27/much-feared-asteroid-apophis-wont-hit-earth-for-at-least-100-years-nasa-says",
        "urlToImage": "https://i.guim.co.uk/img/media/cef0035443a43a81f92dc661cd8c0ae18ab63ff8/505_404_3056_1834/master/3056.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=264fe5d1f016ee433f83dcc18be4c058",
        "publishedAt": "2021-03-27T03:30:00Z",
        "content": "AsteroidsChunk of space rock was once the poster child for hazardous asteroids but it will be a while before humans need to worry about it again\r\nSat 27 Mar 2021 03.30 GMT\r\nNasa has given Earth the a… [+2620 chars]"
    },
    {
        "source": {
            "id": "usa-today",
            "name": "USA Today"
        },
        "author": "Analis Bailey",
        "title": "NCAA clears up issue of outdoor walks after Louisville women's basketball coach raises question - USA TODAY",
        "description": "Louisville coach Jeff Walz said his team was told outdoor walks were no longer allowed, but the NCAA sent updated communication to teams Friday.",
        "url": "https://www.usatoday.com/story/sports/ncaaw/tourney/2021/03/26/louisville-jeff-walz-no-outdoor-walks-ncaa-tournament-sweet-16/7019854002/",
        "urlToImage": "https://www.gannett-cdn.com/presto/2021/03/26/USAT/7e9fa6ab-3344-45c0-b1e1-61a4e4dd421f-USATSI_15687809.jpg?crop=2737,1540,x0,y0&width=1600&height=800&fit=bounds",
        "publishedAt": "2021-03-27T02:51:31Z",
        "content": "Sports Pulse: Going through the biggest matchups in the Sweet 16\r\nUSA TODAY\r\nThe Louisville women’s basketball team will be allowed to walk outdoors again – after a misunderstanding and updated guida… [+3630 chars]"
    },
    {
        "source": {
            "id": null,
            "name": "KSL.com"
        },
        "author": "Lauren Mascarenhas, CNN",
        "title": "Study says COVID-19 vaccines provide protection for pregnant and lactating women — and their newborns - KSL.com",
        "description": "The Pfizer/BioNTech and Moderna Covid-19 vaccines are effective in pregnant and lactating women, who can pass protective antibodies to newborns, according to research published Thursday in the American Journal of Obstetrics and Gynecology.",
        "url": "https://www.ksl.com/article/50133652/study-says-covid-19-vaccines-provide-protection-for-pregnant-and-lactating-women--and-their-newborns",
        "urlToImage": "https://img.ksl.com/slc/2816/281649/28164988.jpg?filter=ksl/responsive_story_lg",
        "publishedAt": "2021-03-27T02:41:13Z",
        "content": "ATLANTA (CNN) The Pfizer/BioNTech and Moderna COVID-19 vaccines are effective in pregnant and lactating women, who can pass protective antibodies to newborns, according to research published Thursday… [+4022 chars]"
    },
    {
        "source": {
            "id": null,
            "name": "The Guardian"
        },
        "author": "Guardian staff reporter",
        "title": "Joe Biden invites 40 world leaders to virtual summit on climate crisis - The Guardian",
        "description": "Xi Jinping and Vladimir Putin among invitees as US heralds return to forefront of climate fight",
        "url": "https://amp.theguardian.com/us-news/2021/mar/26/joe-biden-climate-change-virtual-summit",
        "urlToImage": "https://i.guim.co.uk/img/media/e6c958c526157d1a10e5316775bc12cbe46cc82b/0_136_6000_3600/master/6000.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=61355a4449aa650fd6b2d00a3cc30fc4",
        "publishedAt": "2021-03-27T02:09:00Z",
        "content": "Joe BidenXi Jinping and Vladimir Putin among invitees as US heralds return to forefront of climate fight\r\nSat 27 Mar 2021 02.09 GMT\r\nJoe Biden has invited 40 world leaders to a virtual summit on the … [+3263 chars]"
    }
];

export default News;