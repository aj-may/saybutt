import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import PrankCard from '../components/PrankCard';
import NewDialog from '../components/NewDialog';
import { fetcher } from '../firebase';
import theme from '../theme';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const Page = ({ user, initialPranks }) => {
  const classes = useStyles();

  const [editOpen, setEditOpen] = useState(false);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);

  const { data: pranks, mutate: mutatePranks } = useSWR('pranks', { initialData: initialPranks });

  // Imidiatly revalidate as workaroud for SWR bug: https://github.com/zeit/swr/issues/308
  useEffect(() => {
    mutatePranks();
  }, []);

  return (
    <Container maxWidth="xl" className={classes.root}>
      {pranks && pranks.map(prank => <PrankCard key={prank.id} user={user} prank={prank} />)}

      {user && (
        <Fab color="primary" className={classes.fab} onClick={handleEditOpen}>
          <AddIcon />
        </Fab>
      )}

      <NewDialog open={editOpen} handleClose={handleEditClose} user={user} />
    </Container>
  );
};

export const getStaticProps = async () => {
  const initialPranks = await fetcher('pranks');

  return {
    props: { initialPranks },
    unstable_revalidate: 1,
  };
};

export default Page;
