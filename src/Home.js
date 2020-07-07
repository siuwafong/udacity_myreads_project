import React, { Component } from 'react'
import Shelf from './Shelf'
import { Link } from 'react-router-dom';

export default class Home extends Component {
    render() {
        return (
          <div className="list-books">
          
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          
          <div className="list-books-content">
            <div>
              {/*  filtered 'currentlyReading' books */}
              <Shelf list={this.props.currentlyReadingList} changeList={this.props.changeList} title="Currently Reading"/>
              {/*  filtered 'wantToRead' books */}
              <Shelf list={this.props.wantToReadList} changeList={this.props.changeList} title="Want to Read"/>
              {/*  filtered 'Read' books */}
              <Shelf list={this.props.readList} changeList={this.props.changeList} title="Read"/>
            </div>
          </div>
        
          <div className="open-search">
            <Link exact to="/search" >
            <button>Add a book</button> 
            </Link>
          </div>

        </div>
        )
    }
}
