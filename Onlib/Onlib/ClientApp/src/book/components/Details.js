import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles'
import {
    Grid,
    Typography,
    Button,
    CardMedia,
    CardActionArea,
    CardContent,
    CardActions,
    Card,
    CircularProgress
} from '@material-ui/core';
import Comments from '../../comment/containers/Comments'
import { withCookies } from 'react-cookie';

const styles = {
    card: {
        width: 345,
    },
    media: {
        height: 500,
    }
};

class Details extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { cookies } = this.props
        const bookId = cookies.get('bookId')
        this.props.loadBook(bookId);
        this.props.getOrder(bookId, this.props.userId)
    }

    order = () => {
        const { cookies } = this.props
        if(this.props.userId == 0) {
            this.props.history.push("/login")
        }
        this.props.makeOrder(cookies.get('bookId'), this.props.userId)
    }

    receive = () => {

    }

    render() {
        const { book, classes, order, isOrderOnCreating, isOrderCreated } = this.props;
        return (
            <div style={{ padding: 20 }}>
                <Grid container justify="center" alignItems="center">
                    <Grid className={classes.grid} item>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image={book.cover ? `data:image/png;base64,${book.cover}` : "https://thebookworm1305.files.wordpress.com/2013/05/classic_red_book_cover.jpg" }
                                    title={book.title}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">{book.title}</Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">Description: {book.description}</Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">Author: {book.author}</Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">Publish Date: {book.publishDate}</Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">Copies Number: {book.copiesNumber}</Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                {order || isOrderCreated ? 
                                    <Button onClick={this.receive} disabled={isOrderOnCreating ? true : false} size="small" color="primary">Receive</Button> :
                                    <Button onClick={this.order} disabled={isOrderOnCreating || book.copiesNumber == 0 ? true : false} size="small" color="primary">Order</Button>
                                }
                                {isOrderOnCreating && <CircularProgress size={24} color="primary" />}
                                {isOrderCreated && <Typography>(order already created)</Typography>}
                                {book.copiesNumber == 0 && !isOrderCreated && <Typography>There are currently no free copies.</Typography>}
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
                {!this.props.isLoading && <Comments />}
            </div>
        )
    };
};

const DetailsWithCookies = withCookies(Details)
export default withStyles(styles)(DetailsWithCookies);