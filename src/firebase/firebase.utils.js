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
	appId: '1:1057217631339:web:f4d133141d43ea28db8d2e'
};

// Storing User Data in Firebase
export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;

	const userRef = firestore.doc(`users/${userAuth.uid}`);
	// console.log('userRef----', userRef);
	const snapShot = await userRef.get();
	// console.log('snapShot.data()----', snapShot.data());

	// taking the collectionRef - collection name is 'users'
	// const collectionRef = firestore.collection('users');
	// const collectionSnapshot = await collectionRef.get();
	// fetch the data from the collection
	// console.log({collection: collectionSnapshot.docs.map((doc) => doc.data())});

	if (!snapShot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData
			});
		} catch (error) {
			console.log('error creating user---------', error.message);
		}
	}

	return userRef;
};

firebase.initializeApp(config);

// add collection to the firebase
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
	const collectionRef = firestore.collection(collectionKey);
	console.log('collectionRef----', collectionRef);
	// batch object is used to add all of our sets into it and then they are called all at once
	const batch = firestore.batch();
	// forEach() doesn't return a new array which is good for us as we want to call the object on each element.
	// map() creates a new array
	objectsToAdd.forEach((obj) => {
		// telling to firebase give me a new doc reference for this collection
		// and randomly generate an id for it
		const newDocRef = collectionRef.doc();
		console.log('newDocRef-------', newDocRef);
		batch.set(newDocRef, obj);
	});

	// .commit fires off our batch request and returns a promise
	return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
	const transformedCollection = collections.docs.map((doc) => {
		const { title, items } = doc.data();

		return {
			routeName: encodeURI(title.toLowerCase()),
			id: doc.id,
			title,
			items
		};
	});

	// change the array into an object with the collection objects
	// console.log('transformedCollection-------', transformedCollection);
	return transformedCollection.reduce((accumulator, collection) => {
		accumulator[collection.title.toLowerCase()] = collection;
		return accumulator;
	}, {});
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
