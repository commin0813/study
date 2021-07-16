export const initialState = {
    mainPosts: [{
        id:1,
        User : {
            id :1,
            nickname : '제로초'
        },
        content : '첫 번째 게시글 #해시태그 #익스프레스',
        Images : [
            {
                src : 'https://eduvation.s3.ap-northeast-2.amazonaws.com/uploadFile/PROFILE_E/2021/6/15/ec6e42aa-973c-450c-bc77-676326ce941f.jpg'
            },
            {
                src : 'https://eduvation.s3.ap-northeast-2.amazonaws.com/uploadFile/PROFILE_S/2021/6/15/33dc8a81-48c8-4cc4-b97e-ab5b5f370c88.jpeg'
            },{
                src : 'https://eduvation.s3.ap-northeast-2.amazonaws.com/uploadFile/PROFILE_S/2021/6/15/33dc8a81-48c8-4cc4-b97e-ab5b5f370c88.jpeg'
            },
        ],
        Comments : [{
            User : {
                nickname : 'hero',
            },
            content : '얼른 사고 싶어요~'
        },{
            User : {
                nickname : 'hero2',
            },
            content : '얼른 사고 싶어요~2'
        }]
    }],
    ImagePaths:[],
    postAdded : false,
}

const ADD_POST = 'ADD_POST'
export const addPost = {
    type : ADD_POST,
}



const dummyPost = {
    id:2,
    User : {
        id :1,
        nickname : '제로초'
    },
    content : '첫 번째 게시글 #해시태그 #익스프레스',
    Images : [
        {
            src : 'https://eduvation.s3.ap-northeast-2.amazonaws.com/uploadFile/PROFILE_E/2021/6/15/ec6e42aa-973c-450c-bc77-676326ce941f.jpg'
        },
        {
            src : 'https://eduvation.s3.ap-northeast-2.amazonaws.com/uploadFile/PROFILE_E/2021/6/15/ec6e42aa-973c-450c-bc77-676326ce941f.jpg'
        },

    ],
    Comments : [{
        User : {
            nickname : 'hero',
        },
        content : '얼른 사고 싶어요~'
    },{
        User : {
            nickname : 'hero2',
        },
        content : '얼른 사고 싶어요~2'
    }]
}

const dummyContent = {
    User : {
        nickname : 'hero3',
    },
    content : '얼른 사고 싶어요~3'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            console.log(action)
            return {
                ...state,
                mainPosts: [dummyPost,...state.mainPosts],
                postAdded: true
            }

        default : return state
    }
}

export default reducer;