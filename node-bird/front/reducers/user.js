export const initialState = {
    isLoggedIn: false,
    isLoggedingIn : false, // 로그인 시도 중 
    isLoggedingOut : false, // 로그아웃 시도 중
    me: null,
    signUpData: {},
    loginData: {}
}

// action creator
export const loginRequestAction = (data) => {
    return {
        type: 'LOG_IN_REQUEST',
        data,
    }
}
export const logoutRequestAction = () => {
    return {
        type: 'LOG_OUT_REQUEST',
    }
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOG_IN_REQUEST":
            console.log(action)
            return {
                ...state,
                isLoggedingIn: true,
            }
        case "LOG_IN_SUCCESS":
            console.log(action)
            return {
                ...state,
                isLoggedingIn: false,
                isLoggedIn: true,
                me: { ...action.data , nickname : 'commin'},
            }
        case "LOG_IN_FAILURE":
            console.log(action)
            return {
                ...state,
                isLoggedingIn: false,
                isLoggedIn: false,
            }
        case "LOG_OUT_REQUEST":
            return {
                ...state,
                isLoggedingOut: true,
            }
        case "LOG_OUT_SUCCESS":
            return {
                ...state,
                isLoggedingOut: false,
                isLoggedIn: false,
                me: null,
            }
        case "LOG_OUT_FAILURE":
            return {
                ...state,
                isLoggedingOut: false,
            }
        default: return state;
    }
}

export default reducer;