import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import { TextField, Button, Grid } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const styles = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        width: 200,
        marginRigth: 10
    }
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
            },
            fileName: "Select image for book cover"
        };
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const { book } = this.state;
        if(book.imageToBeUploaded) {
            this.toBase64(book.imageToBeUploaded).then(data => {
                this.setState({
                    book: {
                        ...book,
                        imageToBeUploaded: data
                    }
                });
            });
        }
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


    handleFileBtnClick = (e) => {
        this.inputElement.click();
    }

    handleFile = (e) => {
        const { files } = e.target;
        const { book } = this.state;
        this.setState({
            book: {
                ...book,
                imageToBeUploaded: files[0]
            },
            fileName: files[0] ? files[0].name : "Select image for book cover"
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
        const { book, fileName } = this.state;
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
                    <Grid item style={{ marginBottom: 8, margingTop: 16 }}>
                        <Button onClick={this.handleFileBtnClick} color="default" variant="contained" size="small" startIcon={<CloudUploadIcon />}>{fileName}</Button>
                    </Grid>
                    <Grid item>
                        <Button type="submit" color="primary" variant="contained" size="large">Add</Button>
                    </Grid>
                </Grid>
                <input style={{ visibility: "hidden" }} ref={input => this.inputElement = input} type="file" accept="image/*" onChange={this.handleFile} value={book.stub} />
            </form>
        );
    };
}

export default withStyles(styles)(AddBook);