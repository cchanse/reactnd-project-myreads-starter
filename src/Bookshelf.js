import React from "react";
import PropTypes from "prop-types";
import Book from "./Book.js";

class BookShelf extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired
  };

  render() {
    const { onChangeStatus } = this.props;

    /**
     * @description Filter books by shelf status
     * @param {string} status - Whether status of a  book is 'Currently Reading', 'Want to Read', or 'Read'
    */
    const filterReadingStatus = status => {
      return this.props.books.filter(b => b.shelf.indexOf(status) !== -1);
    };

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">Currently Reading</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {filterReadingStatus("currentlyReading").map(book => (
              <Book book={book} onChangeStatus={onChangeStatus} />

            ))}
          </ol>
        </div>

        <h2 className="bookshelf-title">Want to Read</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {filterReadingStatus("wantToRead").map(book => (
              <Book book={book} onChangeStatus={onChangeStatus} />
            ))}
          </ol>
        </div>

        <h2 className="bookshelf-title">Read</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {filterReadingStatus("read").map(book => (
              <Book book={book} onChangeStatus={onChangeStatus} />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookShelf;
