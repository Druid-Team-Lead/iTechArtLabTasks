import React, { Component } from 'react'
import {
    Grid,
    Typography,
    Button,
    CardMedia,
    CardActionArea,
    CardContent,
    CardActions,
    Card,
    TextField,
    Paper,
    GridList
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const styles = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    menu: {
        width: 200,
    },
}

class Comment extends Component {
    render() {
        return (
            <Paper>
                <Typography variant="h5" component="h3">{this.props.userName}</Typography>
                <Typography component="p">{this.props.comment}</Typography>
            </Paper>
        )
    }
}

export default class Comments extends Component {
    constructor() {
        super()
        this.state = { comments: [], comment: "" };
    }

    componentDidMount() {
        this.props.loadComments(this.props.bookId);
    }

    handlePost = () => {
        this.props.uploadComment({ comment: { comment: this.state.comment, bookId: this.props.bookId.toString() }, userId: this.props.user.id });
    }

    handleInput = (e) => {
        this.setState({ comment: e.target.value })
    }

    render() {
        const { loggedIn } = this.props;
        return (
            <div>
                <Typography variant="h5" component="h3">Comments:</Typography>
                <Grid container direction="column" justify="center" alignItems="center">
                    {this.props.comments.map(comment =>
                        <Grid item key={comment.id}>
                            <Comment comment={comment.comment.comment} userName={comment.user.userName} />
                        </Grid>
                    )}
                </Grid>
                {loggedIn &&
                    <React.Fragment>
                        <TextField
                            label="Your comments..."
                            margin="dense"
                            variant="outlined"
                            multiline
                            rowsMax="15"
                            fullWidth
                            onChange={this.handleInput}
                        />
                        <Button variant="contained" color="primary" onClick={this.handlePost}>Post</Button>
                    </React.Fragment>
                }

            </div>
        );
    }
}