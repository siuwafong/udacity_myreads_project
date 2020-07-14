import React from 'react'
import Shelf from './Shelf'
import { Link } from 'react-router-dom';

export default function Home(props) {

        return (
          <div className="list-books">
          
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          
          {/* Display the three shelves of books */}
          <div className="list-books-content">
            <div>
              {/*  filtered 'currentlyReading' books */}
              <Shelf list={props.currentlyReadingList} changeList={props.changeList} title="Currently Reading"/>
              {/*  filtered 'wantToRead' books */}
              <Shelf list={props.wantToReadList} changeList={props.changeList} title="Want to Read"/>
              {/*  filtered 'Read' books */}
              <Shelf list={props.readList} changeList={props.changeList} title="Read"/>
            </div>
          </div>
        
          {/* Link to the search page */}
          <div className="open-search">
            <Link to="/search" >
                <button>Add a book</button> 
            </Link>
          </div>

        </div>
        )

}
