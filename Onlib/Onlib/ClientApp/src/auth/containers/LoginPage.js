import { connect } from 'react-redux';
import { LoginPage } from '../components/LoginPage'

function mapStateToProps(state) {
    const { loggingIn, loggedIn } = state.authentication;
    return {
        loggingIn,
        loggedIn
    };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage }; 