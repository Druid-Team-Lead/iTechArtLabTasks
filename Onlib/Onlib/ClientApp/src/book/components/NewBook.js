import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import { TextField, Button } from '@material-ui/core';

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
        this.state = { title: "", description: ""};
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.Save(this.state);
    }

    handleTitle = (e) => {
        this.setState({title: e.target.value});
    }

    handleDescription = (e) => {
        this.setState({description: e.target.value});
    }

    render() {
        const classes = this.props;
        return (
            <form className={classes.container} noValidate autoComplete="off">
                <TextField
                    label="Name"
                    className={classes.textField}
                    margin="normal"
                    onChange={this.handleTitle}
                    value={this.state.title}
                />
                <TextField
                    label="Description"
                    className={classes.textField}
                    margin="normal"
                    onChange={this.handleDescription}
                    value={this.state.description}
                />
                <Button color="inherit" size="large" onClick={this.handleSubmit}>Add</Button>
            </form>
        );
    };
}

export default withStyles(styles)(AddBook);