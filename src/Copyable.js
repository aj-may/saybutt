import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Snackbar from '@material-ui/core/Snackbar';
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
    const {children} = this.props;

    return (
      <div style={{ backgroundColor: '#ddd', margin: '1rem 0 0', position: 'relative', height: '48px', borderRadius: '10px 24px 24px 10px' }}>
        <IconButton aria-label="copy" style={{ position: 'absolute', top: '0', right: '0' }} onClick={() => this.handleClick(children)}>
          <Icon>file_copy</Icon>
        </IconButton>

        <code style={{ position: 'absolute', top: '50%', left: '1rem', fontSize: '1rem', marginTop: '-.5rem', color: '#333' }}>
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

export default Prank;
