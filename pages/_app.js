import { useState, useEffect } from 'react';
import Head from 'next/head';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { SnackbarProvider } from 'notistack';
import { SWRConfig } from 'swr';
import Navigation from '../components/Navigation';
import firebase, { fetcher } from '../firebase';
import { track, identify, reset } from '../analytics';
import 'highlight.js/styles/rainbow.css';
import theme from '../theme';

const useStyles = makeStyles(() => ({
  snackbar: {
    [theme.breakpoints.down('xs')]: {
      marginBottom: 60,
    },
  },
}));

const Layout = ({ Component, pageProps }) => {
  const classes = useStyles();
  const [user, setUser] = useState(null);
  useEffect(
    () =>
      firebase.auth().onAuthStateChanged(u => {
        setUser(u);
        if (u) {
          identify(u);
        } else {
          reset();
        }
      }),
    [],
  );

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) jssStyles.parentElement.removeChild(jssStyles);
  });

  return (
    <>
      <Head>
        <title>&gt; saybutt</title>
      </Head>

      <ThemeProvider theme={theme}>
        <SWRConfig value={{ fetcher: fetcher }}>
          <SnackbarProvider
            maxSnack={3}
            autoHideDuration={1500}
            classes={{ root: classes.snackbar }}
          >
            <CssBaseline />

            <Navigation user={user} />

            <Component user={user} {...pageProps} />
          </SnackbarProvider>
        </SWRConfig>
      </ThemeProvider>
    </>
  );
};

export const reportWebVitals = metric => track('web-vitals', metric);

export default Layout;
