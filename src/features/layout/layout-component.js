import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
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
const drawerWidth = 250;
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { useRouter } from 'next/router';

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
  }
}));

const Layout = Component => props => {
  const classes = useStyles();
  const router = useRouter();

  const theme = createMuiTheme({
    palette: {
      type: 'dark'
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
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap>
              Rejection App
            </Typography>
          </Toolbar>
        </AppBar>
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
              <ListItem button key={text}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['Accepted', 'Rejected', 'Unanswered'].map(text => (
              <ListItem button key={text}>
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

Layout.propTypes = {
  Component: PropTypes.object
};

export default Layout;
