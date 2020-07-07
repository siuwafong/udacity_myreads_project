import React, { Component } from 'react';

class Book extends Component {
 	constructor(props) {
      super(props)
      this.handleChange = this.handleChange.bind(this)
    }
  

  handleChange(evt) {
    this.props.changeList(evt.target.dataset.id, evt.target.value)
  }
  render() {


   

   	return (   
      <div className="book">
      <div className="book-top">
      <div className="book-cover" style={{ width: 128, height: 193, 
      backgroundImage: `url(${this.props.imgSrc})`}}></div>
  <div className="book-shelf-changer">
    <select data-id={this.props.id} onChange={this.handleChange}  value={this.props.shelf} className="shelfSelect">
      <option value="move" disabled>Move to...</option>
      <option value="currentlyReading">Currently Reading</option>
      <option value="wantToRead">Want to Read</option>
      <option value="read">Read</option>
      <option value="none">None</option>
    </select>
  </div>
</div>
<div className="book-title">{this.props.title}</div>
<div className="book-authors">{this.props.author}</div>
</div>
      	
    )
  }
  
  
  
}

export default Book;