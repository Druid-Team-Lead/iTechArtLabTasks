import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { bookOperations } from '../actions';
import NewBook from '../components/Details';

const mapStateToProps = state => {
  return {
    book: state.book.currentBook,
    isLoading: state.book.isBooksLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadBook: bindActionCreators(bookOperations, dispatch).loadBook
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewBook);