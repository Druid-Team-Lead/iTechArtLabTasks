const API_ROOT = 'api/'

const callApi = (endpoint, body) => {
    const fullUrl = API_ROOT + endpoint;
    let parameters = null;

    if(body) {
        parameters = {
            method: 'POST',
            body: body,
            headers: {
                'Content-Type': 'application/json',
            }
        }
        console.log(body);
    }
    return fetch(fullUrl, parameters).then(response =>
        response.json().then(json => {
            if (!response.ok) {
                return Promise.reject(json)
            }
            let lol = Promise.resolve(json);
            return lol;
        })
    )
}

export const CALL_API = 'Call API'

export default store => next => action => {
    const callAPI = action[CALL_API]
    if (typeof callAPI === 'undefined') {
        return next(action)
    }

    let { endpoint } = callAPI
    const { types, body } = callAPI

    if (typeof endpoint === 'function') {
        endpoint = endpoint(store.getState())
    }
    if (typeof endpoint !== 'string') {
        throw new Error('Specify a string endpoint URL.')
    }
    if (!Array.isArray(types) || types.length !== 3) {
        throw new Error('Expected an array of three action types.')
    }
    if (!types.every(type => typeof type === 'string')) {
        throw new Error('Expected action types to be strings.')
    }

    const actionWith = data => {
        const finalAction = Object.assign({}, action, data)
        delete finalAction[CALL_API]
        return finalAction
    }

    const [requestType, successType, failureType] = types
    next(actionWith({ type: requestType }))

    return callApi(endpoint, body).then(
        response => next(actionWith({
            response,
            type: successType
        })),
        error => next(actionWith({
            type: failureType,
            error: error.message || 'Something bad happened'
        }))
    )
}