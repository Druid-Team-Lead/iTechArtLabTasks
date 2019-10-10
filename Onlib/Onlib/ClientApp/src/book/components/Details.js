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
    Card
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

    componentDidMount() {
        const { cookies } = this.props
        this.props.loadBook(cookies.get('bookId'));
    }

    render() {
        const { book, classes } = this.props;
        return (
            <div style={{ padding: 20 }}>
                <Grid container justify="center" alignItems="center">
                    <Grid className={classes.grid} item>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image="https://images1.penguinrandomhouse.com/cover/9781524743352"
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
                                <Button size="small" color="primary">Order</Button>
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