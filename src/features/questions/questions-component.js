import React from 'react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';

import Question from './question-component';

import {
  ListItem,
  ListItemAvatar,
  ListSubheader,
  Avatar
} from '@material-ui/core';
// import Divider from '@material-ui/core/Divider';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    // backgroundColor: 'theme.palette.background,'
    position: 'relative',
    overflow: 'auto',
    maxHeight: '90%'
  },
  subheader: {
    backgroundColor: 'green'
  },
  listSection: {
    backgroundColor: theme.palette.background.paper
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 10
  }
}));
const Questions = ({ fetchQuestions, today }) => {
  const classes = useStyles();

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  return (
    <>
      <List className={classes.root} subheader={<li />}>
        <li key={`section-${1}`} className={classes.listSection}>
          <ul className={classes.ul}>
            <ListSubheader>Today</ListSubheader>
            {today.map(q => (
              <ListItem button key={q.id}>
                <ListItemAvatar>
                  <Avatar alt="Profile Picture" />
                </ListItemAvatar>
                <Question props={q} />
              </ListItem>
            ))}
          </ul>
        </li>
      </List>
    </>
  );
};

Questions.propTypes = {
  today: PropTypes.arrayOf(PropTypes.object),
  questions: PropTypes.array,
  fetchQuestions: PropTypes.func,
  createQuestion: PropTypes.func
};

export default Questions;
