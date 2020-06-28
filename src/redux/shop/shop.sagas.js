import { takeLatest, call, put } from 'redux-saga/effects';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import {fetchCollectionsSuccess, fetchCollectionsFailure } from './shopActions';

import ShopActionTypes from './shopTypes';

// all generator functions must have YIELDs in them
export function* fetchCollectionsAsync() {
    yield console.log('I am fired');

    try {
        // 1. create the collectionRef
		const collectionRef = firestore.collection('collections');
        // 2. get our snapshot
        const snapshot = yield collectionRef.get();
        // 3. create collectionsMap
        // call is the affect inside the generator function that invokes the method
        // call(some function ot method, parameters that you passed in the first function call)
        // so instead of const collectionsMap = convertCollectionsSnapshotToMap(snapshot) we do that:
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
        // 4. fire off the collectionsMap into success if successful
        yield put(fetchCollectionsSuccess(collectionsMap))
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message))
    }
}

// takeEvery() doesn't pause the JavaScript
// takeLatest() the last one to update data from database
// saga was listening to this action ShopActionTypes.FETCH_COLLECTIONS_START,
// the moment it heard it fired of the function fetchCollectionsAsync
export function* fetchCollectionsStart() {
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsAsync
    );
}