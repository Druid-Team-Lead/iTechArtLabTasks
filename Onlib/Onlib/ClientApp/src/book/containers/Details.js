import { connect } from 'react-redux';
import NewBook from '../components/Details';

const mapStateToProps = state => {
  return {
    book: state.book.currentBook,
    isLoading: state.book.isBooksLoading,
    loggedIn: state.authentication.loggedIn
  };
};

export default connect(
  mapStateToProps,
  null
)(NewBook);