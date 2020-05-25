import firebase from '../firebase';

const Page = () => null;

export const getServerSideProps = async ({ res, params: { slug } }) => {
  const db = firebase.firestore();
  const prank = await db
    .collection('pranks')
    .doc(slug)
    .get();

  if (!prank.exists) {
    res.writeHead(404);
    res.end('404 Not Found');
    return { props: {} };
  }

  const headers = {
    'Content-Type': 'text/plain',
    'Cache-Control': 's-maxage=1, stale-while-revalidate',
  };
  res.writeHead(200, headers);
  res.end(prank.data().script);

  return { props: {} };
};

export default Page;
