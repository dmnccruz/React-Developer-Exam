import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

const apiUrl = 'https://5f3430949124200016e18826.mockapi.io/api/locations/';

function getApi() {
    return fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(response => response.json())
    .catch((error) => {throw error})
}

function postApi(postInput) {
    return fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postInput)
    }).then(response => response.json())
    .then(data => data)
    .catch((error) => {throw error})
}

function patchApi({postInput, id}) {
    return fetch(apiUrl + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postInput)
    }).then(response => response.json())
    .then(data => data)
    .catch((error) => {throw error})
}

function deleteApi(id) {
    return fetch(apiUrl + id, {
        method: 'DELETE',
    }).then(response => response.json())
    .then(data => data.id)
    .catch((error) => {throw error})
}

function* fetchLocations(action) {
    try {
        const locations = yield call(getApi);
        yield put({type: 'GET_LOCATIONS_SUCCESS', locations: locations});
    } catch (e) {
        yield put({ type: 'GET_LOCATIONS_FAILED, message: e.message' });
    }
}

function* addLocation(action) {
    try {
        const locations = yield call(postApi, action.payload);
        yield put({type: 'ADD_LOCATION_SUCCESS', payload: locations});
    } catch (e) {
        yield put({ type: 'ADD_LOCATION_FAILED, message: e.message' });
    }
}

function* updateLocation(action) {
    try {
        const locations = yield call(patchApi, action.payload);
        yield put({type: 'UPDATE_LOCATION_SUCCESS', payload: locations});
    } catch (e) {
        yield put({ type: 'UPDATE_LOCATION_FAILED, message: e.message' });
    }
}

function* deleteLocation(action) {
    try {
        const locations = yield call(deleteApi, action.payload);
        yield put({type: 'DELETE_LOCATION_SUCCESS', payload: locations});
    } catch (e) {
        yield put({ type: 'DELETE_LOCATION_FAILED, message: e.message' });
    }
}

export default function* locationSaga() {
    yield takeEvery('GET_LOCATIONS_REQUESTED', fetchLocations);
    yield takeLatest('ADD_LOCATION_REQUESTED', addLocation);
    yield takeLatest('UPDATE_LOCATION_REQUESTED', updateLocation);
    yield takeEvery('DELETE_LOCATION_REQUESTED', deleteLocation);
}