import { connect } from 'react-redux';
import { RegisterPage } from '../components/RegisterPage'
import { alertConstants } from '../constants';

function mapStateToProps(state) {
    const { registering } = state.registration;
    return {
        registering,
        isFailed: state.alert.type === alertConstants.ERROR ? true : false,
        isSuccess: state.alert.type === alertConstants.SUCCESS ? true : false,
        message: state.alert.message
    };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export { connectedRegisterPage as RegisterPage };