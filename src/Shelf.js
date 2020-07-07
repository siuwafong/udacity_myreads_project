import React, { Component } from 'react'
import Book from './Book'

export default class Shelf extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <div className="bookshelf">
            <h2 className="bookshelf-title">{this.props.title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                {this.props.list.map(book => (
                    <Book shelf={book.shelf} title={book.title} author={book.authors ? book.authors[0] : "N/A"} imgSrc={this.props.title === "Search Results" ? book.img : book.imageLinks.thumbnail} key={book.id} id={book.id} changeList={this.props.changeList}/>
                ))}
                </ol>
            </div>
            </div>
        )
    }
}
