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

    // Get new comments if changed
    if (action.type === CommentActions.ADD_COMMENT_SUCCESS) {
        let bookId = store.getState().book.currentBook.id
        connection.invoke("UpdateComments", bookId);
    }
    if (action.type === BookActions.BOOK_SUCCESS) {
        connection.on("CommentsChanged", (id) => {
            let load = bindActionCreators(CommentActions.commentOperations, store.dispatch).loadComments
            load(id);
        })
        connection.on("OrderCreated", () => {
            let bookId = store.getState().book.currentBook.id
            const load = bindActionCreators(BookActions.bookOperations, store.dispatch).loadBook;
            load(bookId);
        })
    }
    if (action.type === BookActions.BOOKS_REQUEST) {
        connection.off("CommentsChanged");
        connection.off("OrderCreated")
    }

    // Get new book if added
    if (action.type === BookActions.ADD_BOOK_SUCCESS) {
        connection.invoke("UpdateBooks");
    }
    if (action.type === BookActions.BOOKS_SUCCESS || action.type === BookActions.BOOK_REQUEST) {
        connection.on("NewBookAdded", () => {
            const load = bindActionCreators(BookActions.bookOperations, store.dispatch).loadBooks;
            load();
        })
    } else {
        connection.off("UpdateBooks");
    }

    // New order
    if (action.type === BookActions.ORDER_SUCCESS) {
        connection.invoke("NewOrder");
    }


    return next(action);
};


export default signalRMiddleware;