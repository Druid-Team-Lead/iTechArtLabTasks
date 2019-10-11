import React from 'react';
import {
    TextField,
    Button,
    Grid,
    Checkbox,
    Typography
} from '@material-ui/core';

import { userActions } from '../actions';

export class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                username: '',
                password: '',
                isModerator: false,
                email: ''
            }
        };
    }

    handleChange = (e) => {
        let { name, value } = e.target;
        const { user } = this.state;
        if (name === "isModerator") {
            value = value === "true" ? false : true
        }
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { user } = this.state;
        const { dispatch } = this.props;
        if (user.firstName && user.lastName && user.username && user.password) {
            dispatch(userActions.register(user));
        }
    }

    goLogin = () => {
        this.props.history.push("/login");
    }

    render() {
        const { registering, isFailed, message, isSuccess } = this.props;
        const { user } = this.state;
        console.log(this.props)
        return (
            <form autoComplete="off" onSubmit={this.handleSubmit}>
                <Grid container direction="column" justify="center" alignItems="center">
                    <Grid item>
                        <TextField
                            variant="outlined"
                            name="firstName"
                            label="First Name"
                            margin="normal"
                            onChange={this.handleChange}
                            value={user.firstName}
                            required
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            variant="outlined"
                            name="lastName"
                            label="Last Name"
                            margin="normal"
                            onChange={this.handleChange}
                            value={user.lastName}
                            required
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            variant="outlined"
                            name="email"
                            label="Email"
                            margin="normal"
                            onChange={this.handleChange}
                            value={user.email}
                            required
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            variant="outlined"
                            name="username"
                            label="Username"
                            margin="normal"
                            onChange={this.handleChange}
                            value={user.username}
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
                            value={user.password}
                            required
                        />
                    </Grid>
                    <Grid item>
                        <Typography>Do you want to be moderator?
                            <Checkbox
                                onChange={this.handleChange}
                                name="isModerator"
                                value={user.isModerator}
                                inputProps={{
                                    'aria-label': 'primary checkbox',
                                }}
                            />
                        </Typography>
                    </Grid>
                    <Grid item>
                        {isSuccess && <Button onClick={this.goLogin} color="primary" variant="contained" size="large">Login</Button>}
                        {!isSuccess && <Button type="submit" color="primary" variant="contained" size="large">Register</Button>}
                    </Grid>
                    {registering &&
                        <Grid item>
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" alt="spinner" />
                        </Grid>
                    }
                    {isFailed || isSuccess &&
                        <Grid item>
                            <Typography>{message}</Typography>
                        </Grid>}
                </Grid>
            </form>
        );
    }
}