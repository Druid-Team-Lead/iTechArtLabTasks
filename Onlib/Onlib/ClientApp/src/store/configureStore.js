import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import * as bookReducers from '../book/reducers';
import * as commentReducers from '../comment/reducers';
import api from '../middleware/apiMiddleware';
import signalRMiddleware from '../middleware/signalRMiddleware';
import { authentication } from '../auth/reducers/authentication.reducer';
import { registration } from '../auth/reducers/registration.reducer';
import { users } from '../auth/reducers/users.reducer';
import { alert } from '../auth/reducers/alert.reducer';


export default function configureStore(history, initialState) {

    const middleware = [
        thunk,
        routerMiddleware(history),
        api,
        signalRMiddleware
    ];

    // In development, use the browser's Redux dev tools extension if installed
    const enhancers = [];
    const isDevelopment = process.env.NODE_ENV === 'development';
    if (isDevelopment && typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__) {
        enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
    }

    const rootReducer = combineReducers({
        book: bookReducers.book,
        routing: routerReducer,
        comment: commentReducers.comment,
        authentication,
        registration,
        users,
        alert
    });

    return createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(...middleware), ...enhancers)
    );
}
