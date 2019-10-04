import { connect } from 'react-redux';
import App from '../components/App';

const mapStateToProps = state => {
  return {
    user: state.authentication.user,
    loggedIn: state.authentication.loggedIn,
    books: state.book.books
  };
};


export default connect(
  mapStateToProps,
  null
)(App);
