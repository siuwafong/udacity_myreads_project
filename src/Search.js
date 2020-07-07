import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Shelf  from './Shelf'

export default class Search extends Component {
    render() {
        return (
            <div className="search-books">
            <div className="search-books-bar">
              <Link 
                className="close-search"
                exact
                to='/'
                onClick={this.props.clearSearch}>
                  Close
                </Link>
                
              <div className="search-books-input-wrapper">               
                <input type="text" name="searchBook" placeholder="Search by title or author" onChange={this.props.handleChange} />
              </div>
            </div>
            
            <div className="search-books-results">
              {this.props.errorMessage === false && this.props.searchEntry !== "" && <Shelf list={this.props.searchResults} changeList={this.props.changeList} title="Search Results"  />}
            </div>

          </div>
        )
    }
}
