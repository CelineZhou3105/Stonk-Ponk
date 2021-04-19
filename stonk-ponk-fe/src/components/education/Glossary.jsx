import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import { GlossaryContainer } from '../../css/Div';
import { SubText, SubTitle } from '../../css/Text';

const glossary = [
    { word: 'Ticker', definition: 'Blah'},
    { word: 'ASX', definition: 'Blah'},
    { word: 'Open', definition: 'Blah'},
    { word: 'Bid', definition: 'Blah'},
    { word: 'Call', definition: 'Blah'}
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