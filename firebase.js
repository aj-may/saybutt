import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyBd4bHTkxFaEz6piOa1HepXtvPTq574Kac',
  authDomain: 'say-butt.firebaseapp.com',
  databaseURL: 'https://say-butt.firebaseio.com',
  projectId: 'say-butt',
  storageBucket: 'say-butt.appspot.com',
  messagingSenderId: '526560381286',
  appId: '1:526560381286:web:d7bece94ffcaa419ad20a7',
  measurementId: 'G-VJDKQT5G46',
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const isCollection = key => !!(key.split('/').length % 2);

export const normalize = obj =>
  Object.entries(obj).reduce((acc, [key, value]) => {
    if (value instanceof firebase.firestore.Timestamp) return { [key]: value.toMillis(), ...acc };

    if (value instanceof firebase.firestore.DocumentReference) return { [key]: value.path, ...acc };

    if (value instanceof Object) return { [key]: normalize(value), ...acc };

    return { [key]: value, ...acc };
  }, {});

export const fetcher = async key => {
  if (isCollection(key)) {
    const querySnapshot = await firebase
      .firestore()
      .collection(key)
      .get();
    return querySnapshot.docs.map(snapshot => ({ id: snapshot.id, ...normalize(snapshot.data()) }));
  }
  const snapshot = await firebase
    .firestore()
    .doc(key)
    .get();
  return { id: snapshot.id, ...normalize(snapshot.data()) };
};

export default firebase;
