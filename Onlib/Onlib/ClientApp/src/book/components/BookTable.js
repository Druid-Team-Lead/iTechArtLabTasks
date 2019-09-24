import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid, Paper } from '@material-ui/core';


const useStyles = makeStyles({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function SimpleCard(props) {
  const classes = useStyles();
  console.log(props);
  const { books } = props.props;
  

  return (
    <Grid container spacing={2}>
      {books.map(book =>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Title: {book.title}
            </Typography>
            <Typography variant="body2" component="p">
              Descriptions: {book.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Take a look</Button>
          </CardActions>
        </Card>
      )}
    </Grid>
  );
}

class BookTable extends Component {
  componentWillMount() {
    this.props.CallApi();
  }

  render() {
    
    return (
      <div>
        {renderForecastsTable(this.props)}
      </div>
    );
  }
}

function renderForecastsTable(props) {
  const { books } = props;
  return (
    <Grid container spacing={2}>
      {books.map(book =>
        <Grid item key={book.id}>
          <Paper>
            <div>
              Title: {book.title}
            </div>
            <div>
              Descriptions: {book.description}
            </div>
          </Paper>
        </Grid>
      )}
    </Grid>
  );
}

export default BookTable;