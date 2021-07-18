export const initialState = {
    mainPosts: [{
        id: 1,
        User: {
            id: 1,
            nickname: '제로초'
        },
        content: '첫 번째 게시글 #해시태그 #익스프레스',
        Images: [
            {
                src: 'https://eduvation.s3.ap-northeast-2.amazonaws.com/uploadFile/PROFILE_E/2021/6/15/ec6e42aa-973c-450c-bc77-676326ce941f.jpg'
            },
            {
                src: 'https://eduvation.s3.ap-northeast-2.amazonaws.com/uploadFile/PROFILE_S/2021/6/15/33dc8a81-48c8-4cc4-b97e-ab5b5f370c88.jpeg'
            }, {
                src: 'https://eduvation.s3.ap-northeast-2.amazonaws.com/uploadFile/PROFILE_S/2021/6/15/33dc8a81-48c8-4cc4-b97e-ab5b5f370c88.jpeg'
            },
        ],
        Comments: [{
            User: {
                nickname: 'hero',
            },
            content: '얼른 사고 싶어요~'
        }, {
            User: {
                nickname: 'hero2',
            },
            content: '얼른 사고 싶어요~2'
        }]
    }],
    ImagePaths: [],
    addPostLoading: false,
    addPostDone: false,
    addPostError: null,

    addCommentLoading: false,
    addCommentDone: false,
    addCommentError: null,
}

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST'
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS'
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE'

export const ADD_COMMENT_REQUEST = 'ADD_COMMENTREQUEST'
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENTSUCCESS'
export const ADD_COMMENT_FAILURE = 'ADD_COMMENTFAILURE'

export const addPost = (data) => ({
    type: ADD_POST_REQUEST,
    data,
});

export const addComment = (data) => ({
    type: ADD_COMMENT_REQUEST,
    data,
});

const dummyPost = {
    id: 2,
    User: {
        id: 1,
        nickname: '제로초'
    },
    content: '첫 번째 게시글 #해시태그 #익스프레스',
    Images: [
        {
            src: 'https://eduvation.s3.ap-northeast-2.amazonaws.com/uploadFile/PROFILE_E/2021/6/15/ec6e42aa-973c-450c-bc77-676326ce941f.jpg'
        },
        {
            src: 'https://eduvation.s3.ap-northeast-2.amazonaws.com/uploadFile/PROFILE_E/2021/6/15/ec6e42aa-973c-450c-bc77-676326ce941f.jpg'
        },

    ],
    Comments: [{
        User: {
            nickname: 'hero',
        },
        content: '얼른 사고 싶어요~'
    }, {
        User: {
            nickname: 'hero2',
        },
        content: '얼른 사고 싶어요~2'
    }]
}

const dummyContent = {
    User: {
        nickname: 'hero3',
    },
    content: '얼른 사고 싶어요~3'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST_REQUEST:
            return {
                ...state,
                addPostLoading: true,
                addPostDone: false,
                addPostError: null,
            }
        case ADD_POST_SUCCESS:
            return {
                ...state,
                mainPosts: [dummyPost, ...state.mainPosts],
                addPostDone: true,
                addPostLoading: false,
            }
        case ADD_POST_FAILURE:
            return {
                ...state,
                addPostLoading: false,
                addPostDone: false,
                addPostError: action.error
            }


        case ADD_COMMENT_REQUEST:
            return {
                ...state,
                addCommentLoading: true,
                addCommentDone: false,
                addCommentError: null,
            }
        case ADD_COMMENT_SUCCESS:
            return {
                ...state,
                addCommentDone: true,
                addCommentLoading: false,
            }
        case ADD_COMMENT_FAILURE:
            return {
                ...state,
                addCommentLoading: false,
                addCommentDone: false,
                addCommentError: action.error
            }
        default: return state
    }
}

export default reducer;