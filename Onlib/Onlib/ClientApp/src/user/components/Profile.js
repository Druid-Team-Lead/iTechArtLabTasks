import React from 'react'
import {
    Paper,
    MenuList,
    MenuItem,
    withStyles,
    Grid,
    Typography,
    Button
} from '@material-ui/core';
import { withCookies } from 'react-cookie';

const styles = {
    root: {
        display: 'flex',
        margin: 20
    },
    paper: {
        marginRight: 25
    }
}

class Profile extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            isGeneral: true,
            isBookedBooks: false,
            isBooksOnHand: false
        }
    }

    handleMenuClick = (name) => {
        this.setState({
            isGeneral: false,
            isBookedBooks: false,
            isBooksOnHand: false
        }, () => {
            this.setState({
                [name]: true
            });
        })
    }

    render() {
        const { user, classes, orders } = this.props;
        const { isGeneral, isBookedBooks, isBooksOnHand } = this.state;
        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <MenuList>
                        <MenuItem onClick={(e) => this.handleMenuClick("isGeneral", e)}>
                            <Typography variant="h5" component="h4">
                                General
                            </Typography>
                        </MenuItem>
                        <MenuItem onClick={(e) => this.handleMenuClick("isBookedBooks", e)}>
                            <Typography variant="h5" component="h4">
                                Booked books
                            </Typography>
                        </MenuItem>
                        <MenuItem onClick={(e) => this.handleMenuClick("isBooksOnHand", e)}>
                            <Typography variant="h5" component="h4">
                                Books on hand
                            </Typography>
                        </MenuItem>
                    </MenuList>
                </Paper>
                {isGeneral && <General user={user} />}
                {isBookedBooks && <BookedBooksWithCookies loadOrders={this.props.loadOrders} userId={user.id} orders={orders} history={this.props.history}/>}
                {isBooksOnHand && <BooksOnHand />}
            </div>


        )
    }
}

function General(props) {
    const { user } = props;
    return (
        <Grid container direction="column" justify="flex-start" alignItems="flex-start">
            <Grid item>
                <Typography variant="h6" component="h5">
                    Username: {user.userName}
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="h6" component="h5">
                    Name: {user.lastName} {user.firstName}
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="h6" component="h5">
                    Email: {user.email}
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="h6" component="h5">
                    Role: {user.isModerator ? "Moderator" : "User"}
                </Typography>
            </Grid>
        </Grid>
    );
}

class BookedBooks extends React.PureComponent {
    componentDidMount() {
        const { userId, loadOrders } = this.props;
        loadOrders(userId);
    }

    handleView = (id) => {
        const { cookies, history } = this.props;
        cookies.set('bookId', id, { path: '/' });
        history.push("/details/");
    }

    render() {
        const { orders } = this.props;

        return (
            <Grid container direction="column" justify="flex-start" alignItems="flex-start">
                {orders.map(order =>
                    <Grid item key={order.bookId}>
                        <Typography variant="h6" component="h5">
                            Book title:<Button onClick={(e) => this.handleView(order.bookId, e)} size="small" color="inherit" variant="outlined"> {order.title} </Button>; 
                            Status: {order.bookStatus}; Booked from: {new Date(order.statusActivateTime).toLocaleString("en-US")}
                        </Typography>
                    </Grid>
                )}
            </Grid>
        );
    }
}
const BookedBooksWithCookies = withCookies(BookedBooks)

function BooksOnHand(props) {
    return (
        <div>
            BooksOnHand
        </div>
    );
}

export default withStyles(styles)(Profile)