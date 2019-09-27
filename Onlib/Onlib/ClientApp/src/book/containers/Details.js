import { connect } from 'react-redux';
import NewBook from '../components/Details';

const mapStateToProps = state => {
  return {
    book: state.book.currentBook,
  };
};

export default connect(
  mapStateToProps,
  null
)(NewBook);