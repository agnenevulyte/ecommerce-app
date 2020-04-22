import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyAdU9SEVfFXQGt6mnG4taBmPnHzluXRGoo',
  authDomain: 'crwn-db-23cfc.firebaseapp.com',
  databaseURL: 'https://crwn-db-23cfc.firebaseio.com',
  projectId: 'crwn-db-23cfc',
  storageBucket: 'crwn-db-23cfc.appspot.com',
  messagingSenderId: '1057217631339',
  appId: '1:1057217631339:web:f4d133141d43ea28db8d2e',
};

// Storing User Data in Firebase
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  // console.log('snapShot-----', snapShot);

  if (!snapShot.exists) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user---------', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
