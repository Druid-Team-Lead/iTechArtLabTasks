import {
    JsonHubProtocol,
    HttpTransportType,
    HubConnectionBuilder,
    //LogLevel
} from '@aspnet/signalr';
import * as CommentActions from '../comment/actions';
import * as BookActions from '../book/actions';
import { bindActionCreators } from 'redux';


//const urlRoot = (window.appConfig || {}).URL_ROOT;
//const connectionHub = `${urlRoot}/api/service/hub`;
const connectionHub = "/hub";
const protocol = new JsonHubProtocol();
// let transport to fall back to to LongPolling if it needs to
const transport = HttpTransportType.WebSockets | HttpTransportType.LongPolling;

const options = {
    transport,
    //logMessageContent: true,
    //logger: LogLevel.Trace,
    //accessTokenFactory: () => action.user.access_token
};

const connection = new HubConnectionBuilder()
    .withUrl(connectionHub, options)
    .withHubProtocol(protocol)
    .build();

const startSignalRConnection = connection => connection.start()
    .then(() => console.info('SignalR Connected'))
    .catch(err => console.error('SignalR Connection Error: ', err));

startSignalRConnection(connection);

const signalRMiddleware = store => next => async (action) => {

    if (action.type === CommentActions.ADD_COMMENT_SUCCESS) {
        let bookId = store.getState().book.currentBook.id
        connection.invoke("UpdateComments", bookId);
    }
    if (action.type === BookActions.BOOK_SUCCESS) {
        connection.on("CommentsChanged", (id) => {
            console.log(id);
            let load = bindActionCreators(CommentActions.commentOperations, store.dispatch).loadComments
            load(id);
        })
    }
    if (action.type === BookActions.BOOKS_REQUEST) {
        connection.off("CommentsChanged");
    }

    return next(action);
};


export default signalRMiddleware;