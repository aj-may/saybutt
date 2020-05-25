/* eslint-disable react/no-danger */

import { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import { makeStyles } from '@material-ui/core/styles';

hljs.registerLanguage('bash', bash);

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    fontFamily: 'monospace',
    fontSize: '1rem',
    backgroundColor: '#474949',
    color: '#d1d9e1',
    lineHeight: '1.1876em',
    letterSpacing: '0.00938em',
    overflow: 'auto',
    minHeight: '5rem',
    maxHeight: '20rem',
  },
  textarea: {
    fontSize: 'inherit',
    fontFamily: 'inherit',
    color: 'inherit',
    padding: theme.spacing(1),
    whiteSpace: 'pre-wrap',
    minHeight: '100%',
  },
  pre: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    margin: 0,
    padding: theme.spacing(1),
    whiteSpace: 'pre-wrap',
  },
}));

const CodeInput = props => {
  const [highlighted, setHighlighted] = useState('');
  const classes = useStyles();

  const handleKeyUp = e => setHighlighted(hljs.highlight('bash', e.target.value).value);

  return (
    <Paper className={`${classes.root}`}>
      <InputBase
        autoComplete="off"
        multiline
        fullWidth
        inputProps={{ onKeyUp: handleKeyUp }}
        {...props}
        className={classes.textarea}
      />

      <pre
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: highlighted }}
        className={`${classes.pre}`}
      />
    </Paper>
  );
};

export default CodeInput;
