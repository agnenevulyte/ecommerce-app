// issues and calls all of the other sagas.
import { all, call } from 'redux-saga/effects';

import { fetchCollectionsStart } from './shop/shop.sagas';

// all takes an array of sagas and executes it side by side
export default function* rootSaga() {
    yield all([
        call(fetchCollectionsStart)
    ])
}