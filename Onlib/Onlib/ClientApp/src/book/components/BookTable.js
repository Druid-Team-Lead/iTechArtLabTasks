import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/styles'
import {
  Grid,
  Typography,
  Button,
  CardMedia,
  CardActionArea,
  CardContent,
  CardActions,
  Card,
  CircularProgress
} from '@material-ui/core';
import { withCookies, Cookies } from 'react-cookie';


const styles = {
  card: {
    width: 345,
  },
  media: {
    height: 500,
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
};

class BookItem extends PureComponent {

  handleView = () => {
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
            image={book.cover ? `data:image/png;base64,${book.cover}` : "https://thebookworm1305.files.wordpress.com/2013/05/classic_red_book_cover.jpg"}
            title={book.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">{book.title}</Typography>
            <Typography variant="body2" color="textSecondary" component="p">Description: {book.description}</Typography>
            <Typography variant="body2" color="textSecondary" component="p">Author: {book.author}</Typography>
            <Typography variant="body2" color="textSecondary" component="p">Publish Date: {new Date(book.publishDate).toLocaleString("en-US")}</Typography>
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

class BookTable extends PureComponent {

  componentDidMount() {
    this.props.loadBooks();
  }

  handleView = (id) => {
    const { cookies } = this.props;
    cookies.set('bookId', id, { path: '/' });
    this.props.history.push("/details/");
  }

  render() {
    const { books, classes, isLoading, isLoaded } = this.props;
    return (
      <div style={{ padding: 20 }}>
        {books.length === 0 && isLoaded && !isLoading && <Typography variant="h3" gutterBottom align="center">
          I looked - there are no books at all :(
          </Typography>}
        {isLoading && <CircularProgress size={40} className={classes.buttonProgress} color="secondary"/>}
        <Grid container spacing={4} justify="flex-start">
          {books.map(book =>
            <Grid className={classes.grid} item key={book.id}>
              <BookItem view={this.handleView} classes={classes} book={book} />
            </Grid>
          )}
        </Grid>
      </div>
    );
  }
}

const BookTableWithCookies = withCookies(BookTable)
export default withStyles(styles)(BookTableWithCookies);