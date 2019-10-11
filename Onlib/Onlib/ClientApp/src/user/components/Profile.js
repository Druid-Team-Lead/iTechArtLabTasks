import React from 'react'
import {
    Paper,
    MenuList,
    MenuItem,
    withStyles,
    Grid,
    Typography
} from '@material-ui/core';

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
        const { user, classes } = this.props;
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
                {isBookedBooks && <BookedBooks />}
                {isBooksOnHand && <BooksOnHand />}
            </div>


        )
    }
}

function General(props) {
    const { user } = props;
    return (
        <Grid>
            <Grid item>
                <Typography variant="h5" component="h4">
                    Username: {user.userName}
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="h5" component="h4">
                    Name: {user.lastName} {user.firstName}
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="h5" component="h4">
                    Email: {user.email}
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="h5" component="h4">
                    Role: {user.isModerator ? "Moderator" : "User"}
                </Typography>
            </Grid>
        </Grid>
    );
}

function BookedBooks(props) {
    return (
        <div>
            BookedBooks
        </div>
    );
}

function BooksOnHand(props) {
    return (
        <div>
            BooksOnHand
        </div>
    );
}

export default withStyles(styles)(Profile)