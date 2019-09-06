import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

const composeEnhancers = composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

const configureStore = () => {
    const store = createStore(
        rootReducer,
        composeEnhancers(
            applyMiddleware(thunk),
        )
    );

    return store
};

export default configureStore