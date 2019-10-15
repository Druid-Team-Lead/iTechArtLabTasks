import React from 'react';
import {
    TextField,
    Button,
    Grid,
    Typography,
    CircularProgress
} from '@material-ui/core';

import { userActions } from '../actions';

export class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            username: '',
            password: '',
            submitted: false
        };
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            dispatch(userActions.login(username, password));
        }
    }

    render() {
        const { loggingIn, loggedIn, classes } = this.props;
        const { username, password, submitted } = this.state;
        return (
            <form autoComplete="off" onSubmit={this.handleSubmit}>
                <Grid container direction="column" justify="center" alignItems="center">
                    <Grid item>
                        <TextField
                            variant="outlined"
                            name="username"
                            label="Username"
                            margin="normal"
                            onChange={this.handleChange}
                            value={username}
                            required
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            variant="outlined"
                            name="password"
                            label="Password"
                            margin="normal"
                            onChange={this.handleChange}
                            value={password}
                            required
                        />
                    </Grid>
                    <Grid item>
                        <Button type="submit" color="primary" variant="contained" size="large">Login</Button>
                    </Grid>
                    {loggingIn &&
                        <Grid item>
                            <CircularProgress size={24} color="secondary"/>
                        </Grid>
                    }
                    {!loggedIn && submitted &&
                        <Grid item>
                            <Typography color="error">
                                Username or password entered incorrectly. &#x1F498;
                            </Typography>
                        </Grid>
                    }
                    {loggedIn &&
                        <Grid item>
                            <Typography color="primary">
                                You have successfully logged in. &#128153;
                            </Typography>
                        </Grid>
                    }
                </Grid>
            </form>
        );
    }
}