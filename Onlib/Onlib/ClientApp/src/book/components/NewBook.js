import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import { TextField, Button, Grid, Input } from '@material-ui/core';
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
            book: {
                title: "",
                description: "",
                author: "",
                publishDate: null,
                copiesNumber: ""
            }
        };
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.Save(this.state.book);
        console.log(this.state.book);
        this.props.history.push("/");
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        const { book } = this.state;
        this.setState({
            book: {
                ...book,
                [name]: value
            }
        });
    }

    handleDate = (date) => {
        const { book } = this.state;
        this.setState({
            book: {
                ...book,
                publishDate: date
            }
        });
    }

    handleFile = (e) => {
        const { files } = e.target;
        const { book } = this.state;
        this.toBase64(files[0]).then(data => {
            this.setState({
                book: {
                    ...book,
                    imageToBeUploaded: data
                }
            });
        });

    }

    toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    render() {
        const classes = this.props;
        const { book } = this.state;
        return (
            <form className={classes.container} autoComplete="off" onSubmit={this.handleSubmit}>
                <Grid container direction="column" justify="center" alignItems="center">
                    <Grid item>
                        <TextField
                            variant="outlined"
                            label="Title"
                            className={classes.textField}
                            margin="normal"
                            onChange={this.handleChange}
                            value={book.title}
                            name="title"
                            required
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            variant="outlined"
                            label="Description"
                            className={classes.textField}
                            margin="normal"
                            onChange={this.handleChange}
                            value={book.description}
                            name="description"
                            required
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            variant="outlined"
                            label="Author"
                            className={classes.textField}
                            margin="normal"
                            onChange={this.handleChange}
                            value={book.author}
                            name="author"
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
                                value={book.publishDate}
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
                            onChange={this.handleChange}
                            value={book.copiesNumber}
                            required
                            type="number"
                            name="copiesNumber"
                        />
                    </Grid>
                    <Grid item>
                        <input type="file" accept="image/*" onChange={this.handleFile} value={book.stub} />
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