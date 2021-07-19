import {all, fork, call, put, take, takeEvery, takeLatest, delay} from 'redux-saga/effects'
import axios from 'axios'
import shortId from 'shortid'

import {
    ADD_POST_REQUEST,
    ADD_POST_SUCCESS,
    ADD_POST_FAILURE,
    ADD_COMMENT_REQUEST,
    ADD_COMMENT_FAILURE,
    ADD_COMMENT_SUCCESS, REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE
} from '../reducers/post'
import {ADD_POST_TO_ME, REMOVE_POST_OF_ME} from "../reducers/user";

// ADD POST
function addPostAPI(data) {
    return axios.post('/api/post', data)
}

function* addPost(action) {
    console.log("SAGA_ADDPOST : ", action)
    try {
        yield delay(1000)
        const id = shortId.generate();
        // const result = yield call(addPostAPI, action.data)
        yield put({
            type: ADD_POST_SUCCESS,
            data: {
                id,
                content : action.data
            }
        })

        yield put ({
            type:ADD_POST_TO_ME,
            data: id
        })
    } catch (err) {
        yield put({
            type: ADD_POST_FAILURE,
            data: err.response.data,
        })
    }

}


function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost);
}


// REMOVE POST
function removePostAPI(data) {
    return axios.delete('/api/post', data)
}

function* removePost(action) {
    console.log("SAGA_REMOVE POST : ", action)
    try {
        yield delay(1000)
        // const result = yield call(addPostAPI, action.data)
        yield put({
            type: REMOVE_POST_SUCCESS,
            data: action.data
        })

        yield put ({
            type:REMOVE_POST_OF_ME,
            data: action.data
        })
    } catch (err) {
        console.log(err.response)
        yield put({
            type: REMOVE_POST_FAILURE,
            // data: err.response.data,
        })
    }

}


function* watchRemovePost() {
    yield takeLatest(REMOVE_POST_REQUEST, removePost);
}


// ADD COMMENT
function addCommentAPI(data) {
    return axios.post('/api/comment', data)
}

function* addComment(action) {
    try {
        yield delay(1000)
        // const result = yield call(addCommentAPI, action.data)
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: action.data
        })
    } catch (err) {
        yield put({
            type: ADD_COMMENT_FAILURE,
            data: err.response.data,
        })
    }

}


function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
    yield all([
        fork(watchAddPost),
        fork(watchRemovePost),
        fork(watchAddComment),
    ])
}