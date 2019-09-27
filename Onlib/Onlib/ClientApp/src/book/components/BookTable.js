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


const styles = {
  card: {
    width: 345,
  },
  media: {
    height: 500,
  }
};

class BookItem extends Component {

  handleView = (e) => {
    const id = this.props.book.id;
    this.props.view(id);
  }

  render() {
    const { classes, book } = this.props;
    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="https://images1.penguinrandomhouse.com/cover/9781524743352"
            title="booki!"
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
          <Button size="small" color="primary" onClick={this.handleView} name={book.id}>View</Button>
        </CardActions>
      </Card>
    );
  }
}

class BookTable extends Component {

  componentDidMount() {
    this.props.loadBooks();
  }

  handleView = (id) => {
    this.props.loadBook(id);
    this.props.history.push("/details/");
  }

  render() {
    const { books, classes } = this.props;
    return (
      <div style={{ padding: 20 }}>
        <Grid container spacing={2}>
          {books.map(book =>
            <Grid className={classes.grid} item xs key={book.id}>
              <BookItem view={this.handleView} classes={classes} book={book}/>
            </Grid>
          )}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(BookTable);