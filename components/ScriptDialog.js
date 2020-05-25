/* eslint-disable react/no-danger */

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles';
import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import theme from '../theme';

hljs.registerLanguage('bash', bash);

const useStyles = makeStyles(() => ({
  pre: {
    fontSize: '1rem',
    whiteSpace: 'pre-wrap',
  },
}));

const ScriptDialog = ({ name, script, handleClose, ...props }) => {
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();

  return (
    <Dialog
      scroll="paper"
      onClose={handleClose}
      fullScreen={fullScreen}
      maxWidth="sm"
      fullWidth
      {...props}
    >
      <DialogTitle>{name}</DialogTitle>

      <DialogContent className="hljs">
        <pre className={classes.pre}>
          <code dangerouslySetInnerHTML={{ __html: hljs.highlight('bash', script).value }} />
        </pre>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ScriptDialog;
