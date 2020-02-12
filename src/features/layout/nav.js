import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import WbSunnyIcon from '@material-ui/icons/WbSunny';

import { makeStyles } from '@material-ui/core/styles';

const Nav = ({
  drawerWidth,
  darkMode,
  signOut,
  signIn,
  accounts,
  toggleDarkMode
}) => {
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

  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" noWrap className={classes.title}>
          Rejection App
        </Typography>
        {darkMode ? <Brightness3Icon /> : <WbSunnyIcon />}
        <Switch label="Small" checked={darkMode} onChange={toggleDarkMode} />
        {accounts.length ? (
          <Button onClick={signOut}>Sign Out</Button>
        ) : (
          <Button onClick={signIn} color="inherit">
            Login with Fortmatic
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
