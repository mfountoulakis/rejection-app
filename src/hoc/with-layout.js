import React from 'react';
import { useState, useEffect } from 'react';

import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { useRouter } from 'next/router';
import Button from '@material-ui/core/Button';
import useFortmatic from '../components/use-fortmatic';
import Nav from '../features/layout/nav';
import { makeStyles } from '@material-ui/core/styles';

// import toolbar from './nav';

const drawerWidth = 250;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1
  },
  toolbar: theme.mixins.toolbar,
  margin: {
    margin: theme.spacing(1)
  },
  title: {
    flexGrow: 1
  }
}));

const WithLayout = Component => props => {
  const classes = useStyles();
  const router = useRouter();

  const { accounts, signIn, signOut } = useFortmatic(
    'pk_test_794FC397BCA9DE65'
  );

  //usemapstatetoprops
  useEffect(() => {
    props.authStateChanged(accounts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accounts]);

  const theme = createMuiTheme({
    palette: {
      type: props.darkMode ? 'dark' : 'light'
    }
  });

  const iconOpts = {
    Accepted: <ThumbUpIcon />,
    Rejected: <ThumbDownIcon />,
    Unanswered: <ThumbsUpDownIcon />
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <Nav
          drawerWidth={drawerWidth}
          accounts={accounts}
          signIn={signIn}
          signOut={signOut}
          toggleDarkMode={() => props.toggleDarkMode()}
          {...props}
        />
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.toolbar} />

          <List>
            <ListItem>
              <Fab
                variant="extended"
                onClick={() => router.push(`/question/new`)}
              >
                <AddIcon className={classes.extendedIcon} />
                Add a Question
              </Fab>
            </ListItem>
            {['Questions'].map(text => (
              <ListItem
                button
                key={text}
                onClick={() => {
                  router.push('/'), props.filterQuestions('all');
                }}
              >
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['Accepted', 'Rejected', 'Unanswered'].map(text => (
              <ListItem
                button
                key={text}
                onClick={() => props.filterQuestions(text)}
              >
                <ListItemIcon>{iconOpts[text]}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Component {...props} />
        </main>
      </div>
    </ThemeProvider>
  );
};

WithLayout.propTypes = {
  Component: PropTypes.object,
  filterQuestions: PropTypes.func,
  toggleTheme: PropTypes.func
};

export default WithLayout;
