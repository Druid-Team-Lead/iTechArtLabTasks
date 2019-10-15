import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { bookOperations } from '../actions';
import { orderOperations } from '../actions';
import NewBook from '../components/Details';

const mapStateToProps = state => {
  return {
    book: state.book.currentBook,
    isLoading: state.book.isBooksLoading,
    isLoaded: state.book.isBooksLoaded,
    userId: state.authentication.user.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadBook: bindActionCreators(bookOperations, dispatch).loadBook,
    makeOrder: bindActionCreators(orderOperations, dispatch).makeOrder,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewBook);