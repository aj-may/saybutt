import { useState } from 'react';
import useSWR from 'swr';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CodeIcon from '@material-ui/icons/Code';
import EditIcon from '@material-ui/icons/Edit';
import Copy from './Copy';
import EditDialog from './EditDialog';
import ScriptDialog from './ScriptDialog';
import firebase from '../firebase';
import { track } from '../analytics';

const db = firebase.firestore();
const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '33rem',
    flexGrow: 1,
    margin: theme.spacing(),
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  space: {
    marginRight: 'auto',
  },
}));

const PrankCard = ({ prank, user }) => {
  const classes = useStyles();

  const { data: hearts, mutate: mutateHearts } = useSWR(`pranks/${prank.id}/hearts`);
  const isHearted = hearts && user && hearts.find(h => h.id === user.uid);
  const isAuthor = prank.author && user && prank.author.ref === `users/${user.uid}`;

  // TODO: This ternary can be removed once all pranks have an author.
  const avatar = prank.author ? (
    <Tooltip title={prank.author.displayName} arrow>
      <Avatar alt={prank.author.displayName} src={prank.author.photoURL} />
    </Tooltip>
  ) : (
    <Avatar />
  );

  const [editOpen, setEditOpen] = useState(false);
  const showEdit = () => {
    setEditOpen(true);
    track('edit-prank', { prank: prank.id });
  };
  const hideEdit = () => setEditOpen(false);

  const [scriptOpen, setScriptOpen] = useState(false);
  const showScript = () => {
    setScriptOpen(true);
    track('view-script', { prank: prank.id });
  };
  const hideScript = () => setScriptOpen(false);

  const handleHeart = async () => {
    if (isHearted) {
      await db.doc(`pranks/${prank.id}/hearts/${user.uid}`).delete();
      mutateHearts();

      track('unheart', { prank: prank.id });
    } else {
      const doc = {
        displayName: user.displayName,
        photoURL: user.photoURL,
        ref: db.doc(`users/${user.uid}`),
      };

      await db.doc(`pranks/${prank.id}/hearts/${user.uid}`).set(doc);
      mutateHearts();

      track('heart', { prank: prank.id });
    }
  };

  const trackCopy = () => track('copy', { prank: prank.id });

  return (
    <>
      <Card className={classes.root} elevation={0}>
        <CardHeader avatar={avatar} title={prank.name} subheader={prank.description} />
        <CardContent>
          <Copy code={`curl -L saybutt.com/${prank.id} | sh`} onCopy={trackCopy} />
        </CardContent>

        <CardActions disableSpacing>
          <IconButton
            color={isHearted ? 'secondary' : 'default'}
            onClick={handleHeart}
            disabled={!user}
          >
            <FavoriteIcon />
          </IconButton>

          <AvatarGroup max={5} className={classes.space}>
            {hearts &&
              hearts.map(heart => (
                <Avatar
                  key={heart.id}
                  alt={heart.displayName}
                  src={heart.photoURL}
                  className={classes.small}
                />
              ))}
          </AvatarGroup>

          {isAuthor && (
            <IconButton onClick={showEdit}>
              <EditIcon />
            </IconButton>
          )}

          <IconButton onClick={showScript}>
            <CodeIcon />
          </IconButton>
        </CardActions>
      </Card>

      <EditDialog prank={prank} user={user} open={editOpen} handleClose={hideEdit} />

      <ScriptDialog
        name={prank.name}
        script={prank.script}
        open={scriptOpen}
        handleClose={hideScript}
      />
    </>
  );
};

export default PrankCard;
