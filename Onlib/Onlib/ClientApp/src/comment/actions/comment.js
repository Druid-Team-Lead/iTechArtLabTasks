import { CALL_API } from '../../middleware/api'

export const COMMENTS_REQUEST = 'COMMENTS_REQUEST'
export const COMMENTS_SUCCESS = 'COMMENTS_SUCCESS'
export const COMMENTS_FAILURE = 'COMMENTS_FAILURE'

const fetchComments = (bookId) => ({
    [CALL_API]: {
        types: [COMMENTS_REQUEST, COMMENTS_SUCCESS, COMMENTS_FAILURE],
        endpoint: `Comment/GetComments/${bookId}`
    }
});

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST'
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS'
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE'

const postComment = (newComment) => ({
    [CALL_API]: {
        types: [ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE],
        endpoint: 'Comment/AddComment',
        body: JSON.stringify(newComment)
    }
})

export const commentOperations = {
    loadComments: (bookId) => async (dispatch, getState) => {
        return dispatch(fetchComments(bookId));
    },
    uploadComment: (newComment) => async (dispatch, getState) => {
        return dispatch(postComment(newComment))
    }
}