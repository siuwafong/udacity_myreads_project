import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './Search'
import Home from './Home'
import { Route } from 'react-router-dom';

class BooksApp extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
    searchEntry: "",
    searchResults: [],
    errorMessage: false,
    currentlyReadingList: [],
    wantToReadList: [],
    readList: [],
    allList: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.changeList = this.changeList.bind(this);
    this.setLists = this.setLists.bind(this);
  }

// set the Currently Reading, Want to Read, and Read lists.  Then put all those lists into the All list 
setLists() {
  BooksAPI.getAll().then(res => 
    this.setState({ currentlyReadingList: res.filter(book => book.shelf === 'currentlyReading')})
    )
    .then(() => BooksAPI.getAll().then(res => 
      this.setState({ wantToReadList: res.filter(book => book.shelf === 'wantToRead')})
    ))
    .then(() => BooksAPI.getAll().then(res => 
      this.setState({ readList: res.filter(book => book.shelf === 'read')})
    )
    .then(() => this.setState({allList: [...this.state.wantToReadList, ...this.state.currentlyReadingList, ...this.state.readList]})))
    // .then(() => this.state.searchResults !== [] && this.search(this.state.searchEntry))
    .catch((err) => {throw err})
}


componentDidMount() {
  this.setLists()
}

// search function
search(searchEntry) {
  BooksAPI.search(searchEntry)
    .then(res => {
    this.setState(() => ({searchResults: [], errorMessage: false}))
    res.map(book => (
      this.setState({searchResults: [...this.state.searchResults, {
          id: book.id,
          shelf: this.state.allList.map(listedBook => listedBook.id).includes(book.id) ? this.state.allList.find(listedBook => listedBook.id === book.id).shelf : 'none',  
          title: book.title, 
          authors: book.authors ? book.authors : "N/A", 
          img: book.imageLinks ? book.imageLinks.thumbnail: "N/A"}
    ], errorMessage: false}))
      )
    }
    )
    .catch(err => {
      this.setState(() => ({errorMessage: true}))
  })
}

clearSearch() {
  // clear the search information when going back to the library
  this.setState(() => ({ searchEntry: '', searchResults: [], errorMessage: false}))
}

handleChange(evt) {
    // set a debouncer for the search function
    let timeoutId;
  	this.setState(() => ({
      searchEntry: evt
    }))  
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      timeoutId = setTimeout(() => this.search(this.state.searchEntry), 500)
    }

changeList(bookId, shelf) {

  // update the dropdown menu option in the search results
  const idx = this.state.searchResults.findIndex(book => book.id === bookId)
  const searchResultsLength = this.state.searchResults.length
  const newSearchResults = [...this.state.searchResults.slice(0, idx), {...this.state.searchResults[idx], shelf: shelf }, ...this.state.searchResults.slice(idx + 1, searchResultsLength + 1)]
  this.setState(() => ({ searchResults: newSearchResults}))

  // update the database and reset the lists
  BooksAPI.get(bookId)
    .then((book) => BooksAPI.update(book, shelf))
    .then(() =>   {
      this.setLists();
      })
}

render() {
  
  return (
    <div className="app">
    
      <Route path='/search' render={() => (
        <Search 
            clearSearch = {this.clearSearch}
            searchResults = {this.state.searchResults}
            handleChange = {this.handleChange}
            changeList = {this.changeList}
            searchEntry = {this.state.searchEntry}
            errorMessage = {this.state.errorMessage}
          />
        )}/>
      
      <Route exact path='/'render={() => (
        <Home 
          changeList = {this.changeList}
          currentlyReadingList = {this.state.currentlyReadingList}
          wantToReadList = {this.state.wantToReadList}
          readList = {this.state.readList}
          />

        )}/>        
    </div>
    )  
  }
}

export default BooksApp