import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import { TextField, Button, Grid } from '@material-ui/core';
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
            <form className={classes.container} noValidate autoComplete="off">
                <Grid container direction="column" justify="center" alignItems="center">
                    <Grid item>
                        <TextField
                            label="Title"
                            className={classes.textField}
                            margin="normal"
                            onChange={this.handleTitle}
                            value={this.state.title}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            label="Description"
                            className={classes.textField}
                            margin="normal"
                            onChange={this.handleDescription}
                            value={this.state.description}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            label="Author"
                            className={classes.textField}
                            margin="normal"
                            onChange={this.handleAuthor}
                            value={this.state.author}
                        />
                    </Grid>
                    <Grid item>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                label="Date picker dialog"
                                format="MM/dd/yyyy"
                                onChange={this.handleDate}
                                value={this.state.publishDate}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item>
                        <TextField
                            label="Copies number"
                            className={classes.textField}
                            margin="normal"
                            onChange={this.handleCopiesNumber}
                            value={this.state.copiesNumber}
                        />
                    </Grid>
                    <Grid item>
                        <Button color="inherit" size="large" onClick={this.handleSubmit}>
                        Add
                        </Button>
                    </Grid>
                </Grid>
            </form>
        );
    };
}

export default withStyles(styles)(AddBook);