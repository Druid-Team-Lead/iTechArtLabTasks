import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { bookOperations } from '../actions';
import { orderOperations } from '../actions';
import NewBook from '../components/Details';

const mapStateToProps = state => {
  return {
    book: state.book.currentBook,
    isLoading: state.book.isBooksLoading,
    isLoaded: state.book.isBooksLoaded,
    userId: state.authentication.user ? state.authentication.user.id : 0,
    order: state.order.currentOrder,
    isOrderOnCreating: state.order.isOrderOnCreating,
    isOrderCreated: state.order.isOrderCreated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadBook: bindActionCreators(bookOperations, dispatch).loadBook,
    makeOrder: bindActionCreators(orderOperations, dispatch).makeOrder,
    getOrder: bindActionCreators(orderOperations, dispatch).getOrder
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewBook);