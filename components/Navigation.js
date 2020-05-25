import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GitHubIcon from '@material-ui/icons/GitHub';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import firebase from '../firebase';

const useStyles = makeStyles(() => ({
  brand: {
    flexGrow: 1,
  },
}));

const Navigation = ({ user }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => setAnchorEl(null);

  const login = async () => {
    try {
      const githubAuthProvider = new firebase.auth.GithubAuthProvider();
      await firebase.auth().signInWithPopup(githubAuthProvider);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async () => {
    handleClose();
    try {
      await firebase.auth().signOut();
    } catch (err) {
      console.error(err);
    }
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Toolbar>
      <Typography variant="h4" component="h1" className={classes.brand}>
        &gt; saybutt
      </Typography>
      {!user && (
        <Button onClick={login} endIcon={<GitHubIcon />}>
          Login
        </Button>
      )}
      {user && (
        <>
          <Button
            onClick={handleClick}
            startIcon={<Avatar alt={user.displayName} src={user.photoURL} />}
            endIcon={<ExpandMoreIcon />}
          >
            {user.displayName}
          </Button>
          <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </Menu>
        </>
      )}
    </Toolbar>
  );
};

export default Navigation;
