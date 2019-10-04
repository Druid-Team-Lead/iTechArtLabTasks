import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import { TextField, Button, Grid, Card, CardContent, CardActions } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

const styles = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        width: 200,
        marginRigth: 10
    },
};


class AddBook extends Component {

    constructor() {
        super();
        this.state = {
            title: null,
            description: null,
            author: null,
            publishDate: null,
            copiesNumber: 0
        };
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.Save(this.state);
        this.props.history.replace("/");
    }

    handleTitle = (e) => {
        this.setState({ title: e.target.value });
    }

    handleDescription = (e) => {
        this.setState({ description: e.target.value });
    }

    handleAuthor = (e) => {
        this.setState({ author: e.target.value });
    }

    handleDate = (publishDate) => {
        this.setState({ publishDate });
    }

    handleCopiesNumber = (e) => {
        this.setState({ copiesNumber: e.target.value });
    }


    render() {
        const classes = this.props;
        return (
            <form className={classes.container} autoComplete="off" onSubmit={this.handleSubmit}>
                <Grid container direction="column" justify="center" alignItems="center">
                    <Grid item>
                        <TextField
                            variant="outlined"
                            label="Title"
                            className={classes.textField}
                            margin="normal"
                            onChange={this.handleTitle}
                            value={this.state.title}
                            required
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            variant="outlined"
                            label="Description"
                            className={classes.textField}
                            margin="normal"
                            onChange={this.handleDescription}
                            value={this.state.description}
                            required
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            variant="outlined"
                            label="Author"
                            className={classes.textField}
                            margin="normal"
                            onChange={this.handleAuthor}
                            value={this.state.author}
                            required
                        />
                    </Grid>
                    <Grid item>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                inputVariant="outlined"
                                margin="normal"
                                label="Date picker dialog"
                                format="MM/dd/yyyy"
                                onChange={this.handleDate}
                                className={classes.textField}
                                value={this.state.publishDate}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                required
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item>
                        <TextField
                            variant="outlined"
                            label="Copies number"
                            className={classes.textField}
                            margin="normal"
                            onChange={this.handleCopiesNumber}
                            value={this.state.copiesNumber}
                            required
                            type="number"
                        />
                    </Grid>
                    <Grid item>
                        <Button type="submit" color="primary" variant="contained" size="large">Add</Button>
                    </Grid>
                </Grid>
            </form>
        );
    };
}

export default withStyles(styles)(AddBook);