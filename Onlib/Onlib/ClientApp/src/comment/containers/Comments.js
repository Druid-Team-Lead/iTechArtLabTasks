import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { commentOperations } from '../actions';
import Comments from '../components/Comments'

const mapStateToProps = state => {
  return {
    comments: state.comment.comments,
    isLoading: state.comment.isLoading,
    bookId: state.book.currentBook.id,
    user: state.authentication.user,
    loggedIn: state.authentication.loggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadComments: bindActionCreators(commentOperations, dispatch).loadComments,
    uploadComment: bindActionCreators(commentOperations, dispatch).uploadComment
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comments);