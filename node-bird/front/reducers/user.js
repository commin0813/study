import produce from "immer";

export const initialState = {
    logInLoading: false,
    loginDone: false,
    loginError: null,
    logOutLoading: false,
    logOutDone: false,
    logOutError: null,
    signUpLoading: false,
    signUpDone: false,
    signUpError: null,
    changeNicknameLoading: false,
    changeNicknameDone: false,
    changeNicknameError: false,
    me: null,
    signUpData: {},
    loginData: {}
}


export const LOG_IN_REQUEST = 'LOG_IN_REQUEST'
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS'
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE'

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST'
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS'
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE'


export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST'
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE'

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST'
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS'
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE'


export const FOLLOW_REQUEST = 'FOLLOW_REQUEST'
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS'
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE'

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST'
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS'
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE'

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME'
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME'


// action creator
export const loginRequestAction = (data) => {
    console.log(data)
    return {
        type: LOG_IN_REQUEST,
        data,
    }
}
export const logoutRequestAction = () => {
    return {
        type: LOG_OUT_REQUEST,
    }
}

const dummyUser = (data) => ({
    ...data,
    nickname: "commin",
    id: 1,
    Posts: [],
    Followings: [{nickname: "abc"}, {nickname: "abc"}, {nickname: "abc"},],
    Followers: [{nickname: "abc"}, {nickname: "abc"}, {nickname: "abc"},],
});


const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case LOG_IN_REQUEST:
                draft.logInLoading = true;
                draft.logInError = null;
                draft.logInDone = false;
                break;
            case LOG_IN_SUCCESS:
                draft.logInLoading = false;
                draft.loginDone = true;
                draft.me = dummyUser(action.data);
                break;
            case LOG_IN_FAILURE:
                draft.logInLoading = false;
                draft.loginDone = false;
                draft.loginError = action.error;
                break;
            case LOG_OUT_REQUEST:
                draft.logOutLoading = true;
                draft.logOutDone = false;
                draft.logOutError = null;
                break;

            case LOG_OUT_SUCCESS:
                draft.logOutLoading = false;
                draft.logOutDone = true;
                draft.me = null;
                break;
            case LOG_OUT_FAILURE:
                draft.logOutLoading = false;
                draft.logOurError = action.error;
                break;


            case SIGN_UP_REQUEST:
                draft.signUpLoading = true;
                draft.signUpDone = false;
                draft.signUpError = null;
                break;
            case SIGN_UP_SUCCESS:
                draft.signUpLoading = false;
                draft.signUpDone = true;
                break;
            case SIGN_UP_FAILURE:
                draft.signUpLoading = false;
                draft.signUpError = action.error;
                break;

            case CHANGE_NICKNAME_REQUEST:
                draft.changeNicknameLoading = true;
                draft.changeNicknameDone = false;
                draft.changeNicknameError = null;
                break;
            case CHANGE_NICKNAME_SUCCESS:
                draft.changeNicknameLoading = false;
                draft.changeNicknameDone = true;
                break;
            case CHANGE_NICKNAME_FAILURE:
                draft.changeNicknameLoading = false;
                draft.changeNicknameError = action.error;
                break;

            case ADD_POST_TO_ME:
                draft.me.Posts.unshift({id: action.data});
                break;
            // return {
            //     ...state,
            //     me: {
            //         ...state.me,
            //         Posts: [{id: action.data}, ...state.me.Posts]
            //     }
            // }
            case REMOVE_POST_OF_ME:
                draft.me.Posts = draft.me.Posts.filter((v) => v.id !== action.data);
                break;
            // return {
            //     ...state,
            //     me: {
            //         ...state.me,
            //         Posts: state.me.Posts.filter((v) => v.id !== action.data)
            //     }
            // }

            default:
                break;
        }
    })

}

export default reducer;