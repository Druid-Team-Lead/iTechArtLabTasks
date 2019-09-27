import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { bookOperations } from '../actions';
import NewBook from '../components/NewBook';


const mapDispatchToProps = dispatch => {
  return {
    Save: bindActionCreators(bookOperations, dispatch).uploadBook
  };
};

export default connect(
  null,
  mapDispatchToProps
)(NewBook);
