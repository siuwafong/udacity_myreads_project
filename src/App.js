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

search(searchEntry) {
  BooksAPI.search(searchEntry)
    .then(res => {
    this.setState(() => ({searchResults: []}))
    res.map(book => (
      this.setState({searchResults: [...this.state.searchResults, {
          id: book.id, 
          shelf: this.state.allList.map(listedBook => listedBook.id).includes(book.id) ? this.state.allList.filter(listedBook => listedBook.id === book.id)[0].shelf : 'none', 
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
  this.setState(() => ({ searchEntry: '', searchResults: []}))
}

handleChange(evt) {
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
      
      <Route exact path='/search' render={() => (
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