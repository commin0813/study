import {all, fork, call, put, take, takeEvery, takeLatest, delay} from 'redux-saga/effects'
import axios from 'axios'

// LOGIN
function logInAPI(data) {
    return axios.post('/api/login', data)
}

function* login(action) {
    try {
        yield delay(1000);
        // const result = yield call(logInAPI, action.data)
        yield put({
            type: 'LOG_IN_SUCCESS',
            data: action.data
        })
    } catch (err) {
        yield put({
            type: 'LOG_IN_FAILURE',
            data: err.response.data,
        })
    }

}


// LOGOUT
function logOutAPI() {
    return axios.post('/api/logout')
}

function* logout() {
    try {
        console.log('logout in saga')
        yield delay(1000)
        // const result = yield call(logOutAPI)
        yield put({
            type: 'LOG_OUT_SUCCESS',
            // data: result.data
        })
    } catch (err) {
        yield put({
            type: 'LOG_OUT_FAILURE',
            data: err.response.data,
        })
    }

}

function* watchLogin() {
    yield takeLatest('LOG_IN_REQUEST', login); // takeLatest : 동시에 들어왔을때, 마지막 Evnet만 실행되도록 강제함
}

function* watchLogout() {
    yield takeLatest('LOG_OUT_REQUEST', logout);
}

export default function* userSaga() {
    yield all([
        fork(watchLogin),
        fork(watchLogout),
    ])
}