import React from "react";
import PropTypes from "prop-types";

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
              <li key={book.id} className="book">
                <div className="book">
                  <div className="book-top">
                    <div
                      className="book-cover"
                      style={{
                        width: 128,
                        height: 193,
                        backgroundImage:`url(${book.imageLinks && book.imageLinks.thumbnail?`${book.imageLinks.thumbnail}`:`http://via.placeholder.com/128x193?text=No%20Cover`})`
                      }}
                    />
                    <div className="book-shelf-changer">
                      {/* Instead of using selected attribute, React uses a value attribute on the root select tag. This is  more convenient */}
                      <select value={book.shelf} onChange={event => onChangeStatus(book, event)}>
                        <option value="move" disabled>
                          Move to...
                        </option>
                        <option value="currentlyReading">
                          Currently Reading
                        </option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">
                    {book.title} {book.shelf}
                  </div>
                  <div className="book-authors">{book.authors}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <h2 className="bookshelf-title">Want to Read</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {filterReadingStatus("wantToRead").map(book => (
              <li key={book.id} className="book">
                <div className="book">
                  <div className="book-top">
                    <div
                      className="book-cover"
                      style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${book.imageLinks
                          .smallThumbnail})`
                      }}
                    />
                    <div className="book-shelf-changer">
                      <select value={book.shelf} onChange={event => onChangeStatus(book, event)}>
                        <option value="move" disabled>
                          Move to...
                        </option>
                        <option value="currentlyReading">
                          Currently Reading
                        </option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title} {book.shelf}</div>
                  <div className="book-authors">{book.authors}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <h2 className="bookshelf-title">Read</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {filterReadingStatus("read").map(book => (
              <li key={book.id} className="book">
                <div className="book">
                  <div className="book-top">
                    <div
                      className="book-cover"
                      style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${book.imageLinks
                          .smallThumbnail})`
                      }}
                    />
                    <div className="book-shelf-changer">
                      <select  value={book.shelf} onChange={event => onChangeStatus(book, event)}>
                        <option value="move" disabled>
                          Move to...
                        </option>
                        <option value="currentlyReading">
                          Currently Reading
                        </option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title} {book.shelf}</div>
                  <div className="book-authors">{book.authors}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookShelf;
