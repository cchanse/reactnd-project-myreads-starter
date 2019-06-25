import React from "react";
import * as BooksAPI from "./BooksAPI";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

class Search extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired
  }
  state = {
    query: ''
  };

  updateQuery = (query) => {

    this.setState(()=> ({
      query: query.trim()
    }))

    BooksAPI.search(this.state.query).then(books => books ? this.setState({books}) : []);
    this.setState({
      query:query
    });

  }

  clearQuery = () => {
    this.updateQuery('');
  }

  render() {
    const { query } = this.state;
    const { books, onChangeStatus } = this.props;

    /**
   * @description Filters books displayed by query
   * @param {string} query - The search term entered into input field
  */
    const showingBooks = query === '' ? books : books.filter((b)=> (
      b.title.toLowerCase().includes(query.toLowerCase())
    ))

    return (
      <div>
      <div className="search-books-bar">
        <Link className="close-search" exact to="/">
          Return to MyShelf
        </Link>
        <div className="search-books-input-wrapper">
          <input name="query" className="" type="text" placeholder="Search" value={query}
          onChange={ (event) =>this.updateQuery(event.target.value) }
          />
        </div></div>

        <div className="search-books-results">
        <ol className="books-grid">
          {showingBooks.map((book) => (
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
      </div>
    );
  }
}

export default Search;
