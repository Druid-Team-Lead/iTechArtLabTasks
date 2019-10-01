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
                <Typography variant="h5" component="h3">Nickname</Typography>
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
        this.props.uploadComment({comment: this.state.comment, bookId: this.props.bookId.toString()});
    }

    handleInput = (e) => {
        this.setState({ comment: e.target.value })
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
            <Typography variant="h5" component="h3">Comments:</Typography>
                <Grid container direction="column" justify="center" alignItems="center">
                    {this.props.comments.map(comment =>
                        <Grid item key={comment.id}>
                            <Comment comment={comment.comment}/>
                        </Grid>
                    )}
                </Grid>
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
            </div>
        );
    }
}

//export default withStyles(styles, Comments)