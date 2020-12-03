import { all } from 'redux-saga/effects';
import locationSaga from './locationSaga';
 
export default function* rootSaga() {
    yield all([
        locationSaga(),
    ])
}