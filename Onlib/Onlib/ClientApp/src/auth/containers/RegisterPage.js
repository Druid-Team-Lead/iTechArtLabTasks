import { connect } from 'react-redux';
import { RegisterPage } from '../components/RegisterPage'
import { alertConstants } from '../constants'

function mapStateToProps(state) {
    const { registering } = state.registration;
    return {
        registering,
        isFailed: state.alert.type === "alert-danger"? true : false,
        errorMessage: state.alert.message
    };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export { connectedRegisterPage as RegisterPage };