import React from "react";
import * as BooksAPI from "./BooksAPI";
import Bookshelf from "./Bookshelf";
import Search from "./Search";
import { Route, Link, Switch } from "react-router-dom";
import "./App.css";

class BooksApp extends React.Component {
  state = {
    books: []
  };

  /**
   * @description Make Ajax request for books
  */
  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({
        books
      });
    });

  }

  /**
   * @description Changes the shelf status of a book
   * @param {array} book - The books that the app fetches from api
   * @param {event} event - When user selects shelf option
  */
  changeShelfStatus = (book, event) => {
    //* first update the shelf for the book selected */
    BooksAPI.update(book, event.target.value)
    .then(() => {
      //update the state of books
      BooksAPI.getAll().then(data => {
        this.setState({
          books: data
        })
      })
    });
  };

  render() {

    // Create content for 404 page not found error
    const NoMatch = ({ location }) => (
      <div>
        <h3>No match for <code>{location.pathname}</code></h3>
      </div>
    )

    return (
      <div className="app">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <div>
                    <Bookshelf
                      books={this.state.books}
                      onChangeStatus={this.changeShelfStatus}
                    />
                  </div>
                </div>

                <div className="open-search">
                  <Link to="/search"><button className="open-search">Search books</button></Link>
                </div>
              </div>
            )}
          />
          <Route path="/search" render={() => (
            <Search books={this.state.books} onChangeStatus={this.changeShelfStatus} />
          )} />
          {/* Create a route to handle 404 page not found error */}
          <Route component={NoMatch} />
        </Switch>

        {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
      </div>
    );
  }
}

export default BooksApp;
