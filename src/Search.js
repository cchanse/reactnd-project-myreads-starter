import React from "react";
import * as BooksAPI from "./BooksAPI";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import {DebounceInput} from 'react-debounce-input';
import Book from "./Book.js";

class Search extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired
  }
  state = {
    query: '',
    searchResults: []
  };

  updateQuery = (query) => {
    this.setState(()=> ({
      query: query
    }))

    if (query) {
      BooksAPI.search(query.trim(), 20)
      .then(books => {
        if (books.length > 0) {
          this.setState({searchResults:books})
        } else {this.setState({searchResults: []})}
      })
      .then(()=> {
      })
    } else this.setState({searchResults:[]})
  }

  //once the query is updated and the returned books are found then
  render() {
    const { query } = this.state;
    const { onChangeStatus } = this.props;

  /**
   * @description Filters books displayed by query; returns new books including existing books
   * @param {string} query - The search term entered into input field
  */

    return (
      <div>
      <div className="search-books-bar">
        <Link className="close-search" exact to="/">
          Return to MyShelf
        </Link>
        <div className="search-books-input-wrapper">
          <DebounceInput
            debounceTimeout={1000}
            name="query"
            className=""
            type="text"
            placeholder="Search"
            value={query}
            onChange={event => this.updateQuery(event.target.value)}
          />
        </div></div>

        <div className="search-books-results">
        <ol className="books-grid">
          {this.state.searchResults.length > 0 && this.state.searchResults.map((book) => (
              <Book book={book} onChangeStatus={onChangeStatus} />
          ))}
        </ol>
      </div>
      </div>
    );
  }
}

export default Search;
