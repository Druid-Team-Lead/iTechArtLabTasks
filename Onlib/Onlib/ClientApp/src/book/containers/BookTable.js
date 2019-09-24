import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../actions';
import BookTable from '../components/BookTable'

const mapStateToProps = state => {
  return {
    books: state.book.books,
    isLoading: state.book.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    CallApi: bindActionCreators(actionCreators, dispatch).requestBooks
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookTable);