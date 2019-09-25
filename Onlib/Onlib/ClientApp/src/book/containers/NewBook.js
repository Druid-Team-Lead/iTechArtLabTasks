import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../actions';
import NewBook from '../components/NewBook';

const mapDispatchToProps = dispatch => {
  return {
    Save: bindActionCreators(actionCreators, dispatch).addBook
  };
};

export default connect(
  null,
  mapDispatchToProps
)(NewBook);