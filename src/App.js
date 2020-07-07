import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './Shelf'
import { Link } from 'react-router-dom';

class BooksApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    searchEntry: '',
    searchResults: [],
    errorMessage: false,
    currentlyReadingList: [],
    wantToReadList: [],
    readList: [],
    allList: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
    this.changeList = this.changeList.bind(this);
    this.setCurrentlyReadingList = this.setCurrentlyReadingList.bind(this);
    this.setWantToReadList = this.setWantToReadList.bind(this);
    this.setReadList = this.setReadList.bind(this);
    this.setAllList = this.setAllList.bind(this);
  }

setCurrentlyReadingList() {
  BooksAPI.getAll().then(res => 
    this.setState({ currentlyReadingList: res.filter(book => book.shelf === 'currentlyReading')})
    )
}

setWantToReadList() {
  BooksAPI.getAll().then(res => 
    this.setState({ wantToReadList: res.filter(book => book.shelf === 'wantToRead')})
    )
}

setReadList() {
  BooksAPI.getAll().then(res => 
    this.setState({ readList: res.filter(book => book.shelf === 'read')})
    )
}

setAllList() {
  BooksAPI.getAll().then(res => 
    this.setState({ allList: res.filter(book => book.shelf === 'read' || book.shelf === 'wantToRead' || book.shelf === 'currentlyReading')})
    )
}

componentDidMount() {
  this.setCurrentlyReadingList();
  this.setWantToReadList();
  this.setReadList();
  this.setAllList();
}

search() {
  BooksAPI.search(this.state.searchEntry)
    .then(res => {
    this.setState({searchResults: []})
    res.map(book => (
      this.setState({searchResults: [...this.state.searchResults, {
          id: book.id, 
          shelf: this.state.allList.map(listedBook => listedBook.id).includes(book.id) ? this.state.allList.filter(listedBook => listedBook.id === book.id)[0].shelf : 'none', 
          title: book.title, 
          author: book.authors ? book.authors : "N/A", 
          img: book.imageLinks.thumbnail}
    ], errorMessage: false}))
      )
    }
    ).catch(err => {
      this.setState({errorMessage: true})
  })
}

handleChange(evt) {
    let timeoutId;
  	this.setState({
      searchEntry: evt.target.value.toLowerCase()
    })  
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      timeoutId = setTimeout(() => this.search(this.state.searchEntry), 500)
    }

changeList(bookId, shelf) {
  BooksAPI.get(bookId)
    .then((book) => BooksAPI.update(book, shelf)
    .then(() =>   {
      this.setCurrentlyReadingList();
      this.setWantToReadList();
      this.setReadList();
      } 
    ))
}

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <Link 
                className="close-search"
                exact
                to='/'
                onClick={() => this.setState({ showSearchPage: false,  searchEntry: '', searchResults: []})}>
                  Close
                </Link>
                
              {/* <a className="close-search" onClick={() => this.setState({ showSearchPage: false,  searchEntry: '', searchResults: []})}>Close</a> */}
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}

               
                <input type="text" name="searchBook" placeholder="Search by title or author" onChange={this.handleChange} />
              </div>
            </div>
            <div className="search-books-results">
              {this.state.errorMessage === false && this.state.searchEntry !== "" && <Shelf list={this.state.searchResults} changeList={this.changeList} title="Search Results"  />}
            </div>
          </div>
        ) : 
        
        
          (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {/*  filtered 'currentlyReading' books */}
                <Shelf list={this.state.currentlyReadingList} changeList={this.changeList} title="Currently Reading"/>
                {/*  filtered 'wantToRead' books */}
                <Shelf list={this.state.wantToReadList} changeList={this.changeList} title="Want to Read"/>
                {/*  filtered 'Read' books */}
                <Shelf list={this.state.readList} changeList={this.changeList} title="Read"/>
              </div>
            </div>

            <div className="open-search">
              <button  onClick={() => this.setState({ showSearchPage: true })} >Add a book</button> 
            </div>

          </div>
        )}
      </div>
    )
  }
}

export default BooksApp