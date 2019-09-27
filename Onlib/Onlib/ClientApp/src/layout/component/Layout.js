import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import AddBook from '../../book/containers/NewBook';
import BookTable from '../../book/containers/BookTable';
import Details from '../../book/containers/Details';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

function Layout() {
    const classes = useStyles();

    return (
        <Router>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            <Link exact to="/">Online Library</Link>
                        </Typography>
                        <Button size="small" color="inherit">
                            <Link to="/newBook/">Add new book</Link>
                        </Button>
                        <Button color="inherit">sign up</Button>
                        <Button color="inherit">sign in</Button>
                    </Toolbar>
                </AppBar>
                <Route path="/" exact component={BookTable} />
                <Route path="/newBook/" component={AddBook} />
                <Route path="/details/" component={Details} />

            </div>
        </Router>
    );
}

export default Layout;

