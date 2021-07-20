import shortId from 'shortid'
import produce from "immer";
import faker from "faker";

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
                id: shortId.generate(),
                src: 'https://eduvation.s3.ap-northeast-2.amazonaws.com/uploadFile/PROFILE_E/2021/6/15/ec6e42aa-973c-450c-bc77-676326ce941f.jpg'
            },
            {
                id: shortId.generate(),
                src: 'https://eduvation.s3.ap-northeast-2.amazonaws.com/uploadFile/PROFILE_S/2021/6/15/33dc8a81-48c8-4cc4-b97e-ab5b5f370c88.jpeg'
            }, {
                id: shortId.generate(),
                src: 'https://eduvation.s3.ap-northeast-2.amazonaws.com/uploadFile/PROFILE_S/2021/6/15/33dc8a81-48c8-4cc4-b97e-ab5b5f370c88.jpeg'
            },
        ],
        Comments: [{
            id: shortId.generate(),
            User: {
                id: shortId.generate(),
                nickname: 'hero',
            },
            content: '얼른 사고 싶어요~'
        }, {
            id: shortId.generate(),
            User: {
                id: shortId.generate(),
                nickname: 'hero2',
            },
            content: '얼른 사고 싶어요~2'
        }]
    }],
    ImagePaths: [],
    addPostLoading: false,
    addPostDone: false,
    addPostError: null,
    removePostLoading: false,
    removePostDone: false,
    removePostError: null,
    addCommentLoading: false,
    addCommentDone: false,
    addCommentError: null,
}

initialState.mainPosts = initialState.mainPosts.concat(
    Array(20).fill().map(() => ({
        id: shortId.generate(),
        User: {
            id: shortId.generate(),
            nickname: faker.name.findName(),
        },
        content: faker.lorem.sentence(),
        Images: [{
            src: faker.image.imageUrl(),
        }],
        Comments: [{
            User: {
                id: shortId.generate(),
                nickname: faker.name.findName(),
            },
            content: faker.lorem.sentence(),
        }]
    }))
);


export const ADD_POST_REQUEST = 'ADD_POST_REQUEST'
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS'
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE'


export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST'
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS'
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE'

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

const dummyPost = (data) => ({
    id: data.id,
    User: {
        id: 1,
        nickname: '제로초'
    },
    content: data.content,
    Images: [],
    Comments: []
})

const dummyComment = (data) => ({
    id: shortId.generate(),
    User: {
        id: 1,
        nickname: '제로초'
    },
    content: data,
})


// Reducer란? 이전 상태를 액션을 통해 다음 상태로 만들어내는 함수(불변성은 지키면서)
const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {

            case ADD_POST_REQUEST:
                draft.addPostLoading = true;
                draft.addPostDone = false;
                draft.addPostError = null;
                break;

            case ADD_POST_SUCCESS:
                draft.addPostLoading = false;
                draft.addPostDone = true;
                draft.mainPosts.unshift(dummyPost(action.data));
                break;

            case ADD_POST_FAILURE:
                draft.addPostLoading = false;
                draft.addPostDone = false;
                draft.addPostError = action.error;
                break;

            case REMOVE_POST_REQUEST:
                draft.addPostLoading = true;
                draft.addPostDone = false;
                draft.addPostError = null;
                break;

            case REMOVE_POST_SUCCESS:
                draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data);
                draft.addPostDone = true;
                draft.addPostLoading = false;
                break;

            case REMOVE_POST_FAILURE:
                draft.addPostLoading = false;
                draft.addPostDone = false;
                draft.addPostError = action.error;
                break;

            case ADD_COMMENT_REQUEST:
                draft.addCommentLoading = true;
                draft.addCommentDone = false;
                draft.addCommentError = null;
                break;

            case ADD_COMMENT_SUCCESS: {
                const post = draft.mainPosts.find((v) => v.id === action.data.postId);
                post.Comments.unshift(dummyComment(action.data.content));
                draft.addCommentDone = true;
                draft.addCommentLoading = false;
                break;
                // const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId);
                // const post = {...state.mainPosts[postIndex]}
                // post.Comments = [dummyComment(action.data.content), ...post.Comments];
                // const mainPosts = [...state.mainPosts]
                // mainPosts[postIndex] = post;
                // return {
                //     ...state,
                //     mainPosts,
                //     addCommentDone: true,
                //     addCommentLoading: false,
                // }
            }
            case ADD_COMMENT_FAILURE:
                draft.addCommentLoading = false;
                draft.addCommentDone = false;
                draft.addCommentError = action.error;
                break;
            default:
                break;
        }
    });


}

export default reducer;