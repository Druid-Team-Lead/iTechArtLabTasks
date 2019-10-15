import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Profile from '../components/Profile';
import { orderOperations } from '../../book/actions';

const mapStateToProps = state => {
  return {
    user: state.authentication.user,
    orders: state.order.orders
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadOrders: bindActionCreators(orderOperations, dispatch).loadOrders,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
