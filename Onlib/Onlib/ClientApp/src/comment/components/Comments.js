import React, { Component } from 'react'
import {
    Grid,
    Typography,
    Button,
    TextField,
    Paper
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { withCookies, Cookies } from 'react-cookie';

const styles = {
    paper: {
        width: 600,
        "margin-bottom": 15,
        padding: 5
    },
}

class Comment extends Component {
    render() {
        return (
            <Paper className={this.props.paper}>
                <Typography component="p">Nickname: {this.props.nickname}</Typography>
                <Typography component="p">Comment: {this.props.comment}</Typography>
            </Paper>
        )
    }
}

class Comments extends Component {
    constructor(props) {
        super(props);
        const { cookies } = props;

        this.state = {
            bookId: cookies.get('bookId'),
            comment: ""
        };
    }

    componentDidMount() {
        this.props.loadComments(this.state.bookId);
    }

    handlePost = () => {
        this.props.uploadComment({ comment: this.state.comment, bookId: this.props.bookId.toString(), author: { id: this.props.user.id } });
    }

    handleInput = (e) => {
        this.setState({ comment: e.target.value })
    }

    render() {
        const { loggedIn, classes } = this.props;
        return (
            <div>
                {this.props.comments.length === 0 ? <Typography variant="h5" component="h3">No comments yet. Sign in to put comment.</Typography>
                    : <Typography variant="h5" component="h3">Comments:</Typography>}
                <Grid container direction="column" justify="center" alignItems="flex-start">
                    {this.props.comments.map(comment =>
                        <Grid item key={comment.id}>
                            <Comment comment={comment.comment} nickname={comment.author.userName} paper={classes.paper}/>
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

const CommentsWithCookies = withCookies(Comments);
export default withStyles(styles)(CommentsWithCookies);