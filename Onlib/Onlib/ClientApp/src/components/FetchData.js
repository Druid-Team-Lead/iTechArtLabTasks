import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/Books';

class FetchData extends Component {
  componentWillMount() {
    this.props.requestBooks();
  }

  render() {
    return (
      <div>
        <h1>Books</h1>
        {renderForecastsTable(this.props)}
      </div>
    );
  }
}

function renderForecastsTable(props) {
  return (
    <table className='table'>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {props.books.map(book =>
          <tr key={book.id}>
            <td>{book.title}</td>
            <td>{book.description}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default connect(
  state => state.books,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(FetchData);
