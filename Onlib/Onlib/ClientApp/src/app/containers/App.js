import { connect } from 'react-redux';
import App from '../components/App';

const mapStateToProps = state => {
  return {
    user: state.authentication.user,
    loggedIn: state.authentication.loggedIn
  };
};


export default connect(
  mapStateToProps,
  null
)(App);
