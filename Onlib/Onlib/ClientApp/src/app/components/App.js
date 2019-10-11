import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button
} from '@material-ui/core';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import AddBook from '../../book/containers/NewBook';
import BookTable from '../../book/containers/BookTable';
import Details from '../../book/containers/Details';
import { LoginPage } from '../../auth/containers/LoginPage'
import { RegisterPage } from '../../auth/containers/RegisterPage'
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { PrivateRoute } from '../../auth/components/PrivateRoute';
import Profile from '../../user/containers/Profile';

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    link: {
        'text-decoration': 'none',
        color: 'inherit'
    },
    button: {
        margin: 5
    },
    title: {
        flexGrow: 1,
    },
    appBar: {
        'background-color': 'maroon'
    }
}));

export default function App(props) {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const { user, loggedIn } = props;
    const classes = useStyles();

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    let login = (
        <React.Fragment>
            <Link to="/register" className={classes.link}>
                <Button variant="outlined" color="inherit" className={classes.button}>sign up</Button>
            </Link>
            <Link to="/login" className={classes.link}>
                <Button variant="outlined" color="inherit" className={classes.button}>sign in</Button>
            </Link>
        </React.Fragment>
    );
    if (loggedIn) {
        login = (
            <React.Fragment>
                {user.isModerator &&
                    <Link to="/newBook" className={classes.link}>
                        <Button variant="outlined" color="inherit" className={classes.button}>
                            Add new book
                            </Button>
                    </Link>
                }
                <Button aria-controls="simple-menu" variant="outlined" color="inherit" aria-haspopup="true" onClick={handleClick}>
                    {user.userName}
                </Button>
                <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <Link to="/profile" className={classes.link}>
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                    </Link>
                    <Link to="/login" className={classes.link}>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Link>
                </Menu>
            </React.Fragment>
        );
    }
    return (
        <Router>
            <div className={classes.root}>
                <AppBar position="static" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            <Link to="/" className={classes.link}>Online Library</Link>
                        </Typography>
                        {login}
                    </Toolbar>
                </AppBar>
                <Route exact path="/" component={BookTable} />
                <PrivateRoute path="/newBook" component={AddBook} />
                <PrivateRoute path="/profile" component={Profile} />
                <Route path="/details" component={Details} />
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
            </div>
        </Router>
    );
}