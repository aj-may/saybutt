import { useForm } from 'react-hook-form';
import { mutate } from 'swr';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import theme from '../theme';
import CodeInput from './CodeInput';
import firebase from '../firebase';

const db = firebase.firestore();
const useStyles = makeStyles(() => ({
  dialogContent: {
    '& .MuiTextField-root': {
      marginBottom: theme.spacing(2),
    },
  },
}));

const NewDialog = ({ handleClose, user, ...props }) => {
  const { register, handleSubmit, errors } = useForm();
  const classes = useStyles();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const onSubmit = async ({ id, ...data }) => {
    await db.doc(`pranks/${id}`).set({
      author: {
        displayName: user.displayName,
        photoURL: user.photoURL,
        ref: db.doc(`users/${user.uid}`),
      },
      ...data,
    });
    mutate('pranks');
    handleClose();
  };

  const idTaken = async id => {
    const docSnapshot = await db.doc(`pranks/${id}`).get();
    return docSnapshot.exists ? 'This URL is already taken.' : true;
  };

  return (
    <Dialog
      scroll="paper"
      onClose={handleClose}
      fullScreen={fullScreen}
      maxWidth="sm"
      fullWidth
      {...props}
    >
      <DialogTitle>New Prank</DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className={classes.dialogContent}>
          <TextField
            autoFocus
            error={!!errors.name}
            helperText={errors.name?.message}
            inputRef={register({
              required: 'Enter a name for your prank.',
            })}
            label="Name"
            name="name"
            fullWidth
          />

          <TextField
            error={!!errors.id}
            helperText={errors.id?.message}
            inputRef={register({
              required: 'Enter a URL.',
              pattern: {
                value: /^[-a-z0-9]+$/,
                message: 'URL can only contain lowercase letters, numbers, and hyphens.',
              },
              validate: idTaken,
            })}
            label="URL"
            name="id"
            InputProps={{
              startAdornment: <InputAdornment position="start">saybutt.com/</InputAdornment>,
            }}
            fullWidth
          />

          <TextField
            error={!!errors.description}
            helperText={errors.description?.message}
            inputRef={register({
              required: 'Enter a description.',
            })}
            label="Description"
            name="description"
            multiline
            rowsMax={4}
            fullWidth
          />

          <CodeInput
            error={!!errors.script}
            // TODO: CodeInput doesn't accept helperText yet
            // helperText={errors.script?.message}
            inputRef={register({
              required: 'Enter your script.',
            })}
            placeholder="echo 'Paste your script here!'"
            name="script"
          />
        </DialogContent>

        <DialogActions>
          <Button type="submit" color="primary">
            Save
          </Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default NewDialog;
