const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();
const usersRef = db.collection('users');
const increment = admin.firestore.FieldValue.increment(1);
const decrement = admin.firestore.FieldValue.increment(-1);
const { arrayUnion, arrayRemove } = admin.firestore.FieldValue;

exports.setupUser = functions.auth
  .user()
  .onCreate(({ uid, email, displayName, photoURL }) =>
    usersRef.doc(uid).create({ email, displayName, photoURL }),
  );

exports.cleanupUser = functions.auth.user().onDelete(({ uid }) => usersRef.doc(uid).delete());
