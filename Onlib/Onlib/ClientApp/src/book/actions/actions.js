export const REQUESTBOOKS = 'REQUEST_BOOKS';
export const RECEIVEBOOKS = 'RECEIVE_BOOKS';

export const actionCreators = {
    requestBooks: () => async (dispatch, getState) => {

        dispatch({ type: REQUESTBOOKS });

        const url = `api/Book/GetBooks`;
        const response = await fetch(url);
        const books = await response.json();

        dispatch({ type: RECEIVEBOOKS, books });
    }
};