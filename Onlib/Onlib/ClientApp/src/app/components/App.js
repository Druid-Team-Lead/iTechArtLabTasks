import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
import { LoginPage } from '../../auth/components/LoginPage'
import { RegisterPage } from '../../auth/containers/RegisterPage'

const useStyles = makeStyles(theme => ({
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

function App() {
    const classes = useStyles();

    return (
        <Router>
            <div className={classes.root}>
                <AppBar position="static" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            <Link exact to="/" className={classes.link}>Online Library</Link>
                        </Typography>
                        <Link to="/newBook" className={classes.link}>
                            <Button variant="outlined" color="inherit" className={classes.button}>
                                Add new book
                            </Button>
                        </Link>
                        <Link to="/register" className={classes.link}>
                            <Button variant="outlined" color="inherit" className={classes.button}>
                                sign up
                            </Button>
                        </Link>
                        <Link to="/login" className={classes.link}>
                            <Button variant="outlined" color="inherit" className={classes.button}>
                                sign in
                            </Button>
                        </Link>
                    </Toolbar>
                </AppBar>
                <Route path="/" exact component={BookTable} />
                <Route path="/newBook" component={AddBook} />
                <Route path="/details" component={Details} />
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
            </div>
        </Router>
    );
}

export default App;