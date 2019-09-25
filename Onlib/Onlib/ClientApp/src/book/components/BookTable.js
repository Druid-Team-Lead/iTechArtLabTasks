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


class BookTable extends Component {
  componentWillMount() {
    this.props.CallApi();
  }

  render() {
    const { books, classes } = this.props;
    return (
      <div style={{ padding: 20 }}>
        <Grid container spacing={2}>
          {books.map(book =>
            <Grid className={classes.grid} item xs>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image="https://images1.penguinrandomhouse.com/cover/9781524743352"
                    title="booki!"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">{book.title}</Typography>
                    <Typography variant="body2" color="textSecondary" component="p">{book.description}</Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">View</Button>
                </CardActions>
              </Card>
            </Grid>
          )}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(BookTable);