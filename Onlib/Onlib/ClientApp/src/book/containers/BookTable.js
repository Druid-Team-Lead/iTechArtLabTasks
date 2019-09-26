import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { bookOperations } from '../actions';
import BookTable from '../components/BookTable'

const mapStateToProps = state => {
  return {
    books: state.book.books,
    isLoading: state.book.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadBooks: bindActionCreators(bookOperations, dispatch).loadBooks
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookTable);