import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';
import copy from 'clipboard-copy';

class Prank extends Component {
  state = { showSnackbar: false };

  handleClick(value) {
    copy(value);
    this.setState({ showSnackbar: true });
    setTimeout(() => {
      this.setState({ showSnackbar: false });
    }, 3000)
  }

  handleClose() {
    this.setState({ showSnackbar: false });
  }

  render() {
    const { children, classes } = this.props;

    return (
      <div className={classes.root}>
        <IconButton aria-label="copy" className={classes.button} onClick={() => this.handleClick(children)}>
          <Icon>file_copy</Icon>
        </IconButton>

        <code className={classes.code}>
          {children}
        </code>

        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={this.state.showSnackbar}
          onClose={() => this.handleClose()}
          message="Copied to clipboard"
        />
      </div>);
  }
}

const styles = () => ({
  root: {
    backgroundColor: '#ddd',
    margin: '1rem 0 0',
    position: 'relative',
    height: '48px',
    borderRadius: '5px 24px 24px 5px',
  },
  button: {
    position: 'absolute',
    top: '0',
    right: '0',
  },
  code: {
    position: 'absolute',
    top: '50%',
    left: '1rem',
    fontSize: '1rem',
    marginTop: '-.5rem',
    color: '#333',
  },
});

export default withStyles(styles)(Prank);
