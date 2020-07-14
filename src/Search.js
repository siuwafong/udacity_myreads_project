import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Shelf  from './Shelf'

export default class Search extends Component {
    render() {
        return (
          <div className="search-books">

            {/* Back link to go back to the home page */}
            <div className="search-books-bar">
              <Link 
                className="close-search"
                to='/'
                onClick={this.props.clearSearch}>
                  Close
                </Link>
                
              <div className="search-books-input-wrapper">               
                <input type="text" name="searchBook" placeholder="Search by title or author"  onChange={(event) => this.props.handleChange(event.target.value)} />
              </div>
            </div>
            
            {/* Show the search results or if there are no results show a "no results" message */}
            <div className="search-books-results">
              {this.props.errorMessage === false && this.props.searchEntry !== "" && <Shelf list={this.props.searchResults} changeList={this.props.changeList} title="Search Results"  />}
              {this.props.errorMessage && this.props.searchEntry !== "" ? <h1>No results for "{this.props.searchEntry}"</h1> : ""}
            </div>

          </div>
        )
    }
}
