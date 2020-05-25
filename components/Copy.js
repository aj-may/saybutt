import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CopyIcon from '@material-ui/icons/FileCopy';
import copyToClipboard from 'copy-to-clipboard';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#303030',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
  },
  code: {
    flexGrow: 1,
    fontSize: '1rem',
    margin: theme.spacing(2),
    fontFamily: 'monospace',
  },
}));

const Copy = ({ code, onCopy }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const handleClick = () => {
    copyToClipboard(code);
    enqueueSnackbar('Copied to clipboard');

    if (onCopy) onCopy();
  };

  return (
    <Paper elevation={0} className={classes.root}>
      <Typography noWrap className={classes.code}>
        {code}
      </Typography>

      <IconButton onClick={handleClick} color="inherit">
        <CopyIcon />
      </IconButton>
    </Paper>
  );
};

export default Copy;
