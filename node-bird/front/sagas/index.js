import {all, fork, call, put, take, takeEvery, takeLatest} from 'redux-saga/effects'
import axios from 'axios'


// LOGIN
function logInAPI(data) {
    return axios.post('/api/login', data)
}

function* login(action) {
    try {
        yield delay(1000);
        const result = yield call(logInAPI, action.data)
        yield put({
            type: 'LOG_IN_SUCCESS',
            data: result.data
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
        const result = yield call(logOutAPI)
        yield put({
            type: 'LOG_OUT_SUCCESS',
            data: result.data
        })
    } catch (err) {
        yield put({
            type: 'LOG_OUT_FAILURE',
            data: err.response.data,
        })
    }

}


// ADD POST
function addPostAPI(data) {
    return axios.post('/api/post', data)
}

function* addPost(action) {
    try {
        const result = yield call(addPostAPI, action.data)
        yield put({
            type: 'ADD_POST_SUCCESS',
            data: result.data
        })
    } catch (err) {
        yield put({
            type: 'ADD_POST_FAILURE',
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

function* watchAddPost() {
    yield takeLatest('ADD_POST_REQUEST', addPost);
}


export default function* rootSaga() {
    yield all([
        fork(watchLogin),
        fork(watchLogout),
        fork(watchAddPost),
    ])
}