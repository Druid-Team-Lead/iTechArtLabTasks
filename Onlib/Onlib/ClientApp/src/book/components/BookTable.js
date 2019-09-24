import React, { Component } from 'react';

class BookTable extends Component {
  componentWillMount() {
    this.props.CallApi();
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
  const { books } = props;
  return (
    <table className='table'>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {books.map(book =>
          <tr key={book.id}>
            <td>{book.title}</td>
            <td>{book.description}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default BookTable;