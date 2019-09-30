import {
    JsonHubProtocol,
    HttpTransportType,
    HubConnectionBuilder,
    LogLevel
} from '@aspnet/signalr'; // version 1.0.4

// action for user authentication and receiving the access_token
import * as ActionTypes from '../book/actions';

const onNotifReceived = res => {
    console.log('****** NOTIFICATION ******', res);
};

const startSignalRConnection = connection => connection.start()
    .then(() => console.info('SignalR Connected'))
    .catch(err => console.error('SignalR Connection Error: ', err));

const signalRMiddleware = ({ getState }) => next => async (action) => {
    // register signalR after the user logged in
    if (action.type === ActionTypes.BOOKS_SUCCESS) {
        //const urlRoot = (window.appConfig || {}).URL_ROOT;
        //const connectionHub = `${urlRoot}/api/service/hub`;
        const connectionHub = "/hub";

        const protocol = new JsonHubProtocol();

        // let transport to fall back to to LongPolling if it needs to
        const transport = HttpTransportType.WebSockets | HttpTransportType.LongPolling;

        /*
        const options = {
            transport,
            logMessageContent: true,
            logger: LogLevel.Trace,
            accessTokenFactory: () => action.user.access_token
        };
*/
        // create the connection instance
        const connection = new HubConnectionBuilder()
            .withUrl(connectionHub) // options
            .withHubProtocol(protocol)
            .build();

        // event handlers, you can use these to dispatch actions to update your Redux store
        connection.on('OperationProgress', onNotifReceived);
        connection.on('UploadProgress', onNotifReceived);
        connection.on('DownloadProgress', onNotifReceived);

        // re-establish the connection if connection dropped
        connection.onclose(() => setTimeout(startSignalRConnection(connection), 5000));

        startSignalRConnection(connection);
    }

    return next(action);
};

export default signalRMiddleware;