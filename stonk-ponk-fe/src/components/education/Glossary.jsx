import React from 'react';

import { GlossaryContainer } from '../../css/Div';
import { SubText, SubTitle } from '../../css/Text';

import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';

const glossary = [
    { word: 'Ticker', definition: 'Or stock symbol is a unique series of letters assigned to a security for trading purposes'},
    { word: 'ASX', definition: 'Australian Stock Exchange'},
    { word: 'Open', definition: 'The price at which a security first trades upon the opening of an exchange on a trading day'},
    { word: 'Bid', definition: 'represents the highest price someone is willing to pay for a share'},
    { word: 'Ask', definition: 'The minimum price that a seller is willing to take for a share of stock or other security'},
    { word: 'High', definition: 'The highest price a stock was traded on an exchange on a trading day'},
    { word: 'Low', definition: 'The lowest price a stock was traded on an exchange on a trading day'},
    { word: 'Close', definition: 'The closing price of a traded stock on an exchange on a trading day'},
    { word: 'Change', definition: 'The difference between the current price and the last trade of the previous day'},
    { word: 'Market Cap', definition: 'How much a company is worth as determined by the stock market'},
    { word: 'Portfolio', definition: 'Compilation of individual stocks that you own'},
    { word: 'Watchlist', definition: 'A list of securities selected for special surveillance'},
    { word: 'Performance', definition: "The measurement of a stock's ability to increase or decrease the wealth of its shareholders"}
]

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 1,
        borderRadius: '3px 3px 0 0',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
      },
    heading: {
      fontSize: theme.typography.pxToRem(16),
      fontWeight: theme.typography.fontWeightBold,
    },
  }));

/**
 * Glossary - An accordion component which shows users the definition of words across the website.
 */
export function Glossary () {
    const classes = useStyles();

    return (
        <GlossaryContainer>
            <SubTitle>Glossary</SubTitle>
            <SubText>Don't know what a word means? Look it up here.</SubText>
            {glossary.map(value => {
                return (
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            className={classes.root}
                        >
                        <Typography className={classes.heading}>{value.word}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography>
                            {value.definition}
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                )
            })}
        </GlossaryContainer>
    )
}