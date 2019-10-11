import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Profile from '../components/Profile';

const mapStateToProps = state => {
  return {
    user: state.authentication.user
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  null
)(Profile);
