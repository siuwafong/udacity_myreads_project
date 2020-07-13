import React from 'react'
import Book from './Book'

export default function Shelf(props) {
        return (
            <div className="bookshelf">
            <h2 className="bookshelf-title">{props.title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                {props.list.map(book => (
                    <Book shelf={book.shelf} title={book.title} author={book.authors ? book.authors[0] : "N/A"} imgSrc={props.title === "Search Results" ? book.img : book.imageLinks.thumbnail} key={book.id} id={book.id} changeList={props.changeList}/>
                ))}
                </ol>
            </div>
            </div>
        )
}
