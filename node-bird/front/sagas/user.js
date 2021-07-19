import axios from 'axios';
import {all, delay, fork, put, takeLatest} from 'redux-saga/effects';
import {
    LOG_IN_SUCCESS, LOG_OUT_SUCCESS, LOG_OUT_REQUEST, LOG_IN_REQUEST, LOG_IN_FAILURE, LOG_OUT_FAILURE,
    SIGN_UP_SUCCESS, SIGN_UP_REQUEST, SIGN_UP_FAILURE
} from '../reducers/user';

// LOGIN
function logInAPI(data) {
    return axios.post('/api/login', data)
}

function* login(action) {
    try {
        console.log("SAGA_LOGIN : " , action)
        yield delay(1000);
        // const result = yield call(logInAPI, action.data)
        yield put({
            type: LOG_IN_SUCCESS,
            data: action.data
        })
    } catch (err) {
        console.log("SAGA ERR : ", err)
        yield put({
            type: LOG_IN_FAILURE,
            error: err.response.data,
        })
    }

}


// LOGOUT
function logOutAPI() {
    return axios.post('/api/logout')
}

function* logout() {
    try {
        yield delay(1000)
        // const result = yield call(logOutAPI)
        yield put({
            type: LOG_OUT_SUCCESS,
            // data: result.data
        })
    } catch (err) {
        yield put({
            type: LOG_OUT_FAILURE,
            data: err.response.data,
        })
    }

}

function signUpAPI() {
    return axios.post('/api/signUp')
}

function* signUp() {
    try {
        yield delay(1000)
        // const result = yield call(signUp)
        yield put({
            type: SIGN_UP_SUCCESS,
            // data: result.data
        })
    } catch (err) {
        yield put({
            type: SIGN_UP_FAILURE,
            data: err.response.data,
        })
    }
}

function* watchLogin() {
    yield takeLatest(LOG_IN_REQUEST, login); // takeLatest : 동시에 들어왔을때, 마지막 Evnet만 실행되도록 강제함
}

function* watchLogout() {
    yield takeLatest(LOG_OUT_REQUEST, logout);
}

function* watchSignUp() {
    yield takeLatest(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
    yield all([
        fork(watchLogin),
        fork(watchLogout),
        fork(watchSignUp),
    ])
}