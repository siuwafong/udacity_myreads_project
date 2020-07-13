(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{22:function(e,t,a){e.exports=a(36)},27:function(e,t,a){},34:function(e,t,a){},36:function(e,t,a){"use strict";a.r(t);var n=a(1),s=a.n(n),r=a(19),c=a.n(r),i=a(21),o=a(5),l=a(6),h=a(8),u=a(7),d=a(9),p=a(2),b=a(16),m="https://reactnd-books-api.udacity.com",f=localStorage.token;f||(f=localStorage.token=Math.random().toString(36).substr(-8));var g={Accept:"application/json",Authorization:f},L=function(){return fetch("".concat(m,"/books"),{headers:g}).then(function(e){return e.json()}).then(function(e){return e.books})},v=(a(27),a(10)),y=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(h.a)(this,Object(u.a)(t).call(this,e))).handleChange=a.handleChange.bind(Object(p.a)(Object(p.a)(a))),a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"handleChange",value:function(e){this.props.changeList(e.target.dataset.id,e.target.value)}},{key:"render",value:function(){return s.a.createElement("div",{className:"book"},s.a.createElement("div",{className:"book-top"},s.a.createElement("div",{className:"book-cover",style:{width:128,height:193,backgroundImage:"url(".concat(this.props.imgSrc,")")}}),s.a.createElement("div",{className:"book-shelf-changer"},s.a.createElement("select",{"data-id":this.props.id,onChange:this.handleChange,value:this.props.shelf,className:"shelfSelect"},s.a.createElement("option",{value:"move",disabled:!0},"Move to..."),s.a.createElement("option",{value:"currentlyReading"},"Currently Reading"),s.a.createElement("option",{value:"wantToRead"},"Want to Read"),s.a.createElement("option",{value:"read"},"Read"),s.a.createElement("option",{value:"none"},"None")))),s.a.createElement("div",{className:"book-title"},this.props.title),s.a.createElement("div",{className:"book-authors"},this.props.author))}}]),t}(n.Component),j=function(e){function t(e){return Object(o.a)(this,t),Object(h.a)(this,Object(u.a)(t).call(this,e))}return Object(d.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this;return s.a.createElement("div",{className:"bookshelf"},s.a.createElement("h2",{className:"bookshelf-title"},this.props.title),s.a.createElement("div",{className:"bookshelf-books"},s.a.createElement("ol",{className:"books-grid"},this.props.list.map(function(t){return s.a.createElement(y,{shelf:t.shelf,title:t.title,author:t.authors?t.authors[0]:"N/A",imgSrc:"Search Results"===e.props.title?t.img:t.imageLinks.thumbnail,key:t.id,id:t.id,changeList:e.props.changeList})}))))}}]),t}(n.Component),E=function(e){function t(){return Object(o.a)(this,t),Object(h.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this;return s.a.createElement("div",{className:"search-books"},s.a.createElement("div",{className:"search-books-bar"},s.a.createElement(v.b,{className:"close-search",exact:!0,to:"/",onClick:this.props.clearSearch},"Close"),s.a.createElement("div",{className:"search-books-input-wrapper"},s.a.createElement("input",{type:"text",name:"searchBook",placeholder:"Search by title or author",onChange:function(t){return e.props.handleChange(t.target.value)}}))),s.a.createElement("div",{className:"search-books-results"},!1===this.props.errorMessage&&""!==this.props.searchEntry&&s.a.createElement(j,{list:this.props.searchResults,changeList:this.props.changeList,title:"Search Results"}),this.props.errorMessage&&""!==this.props.searchEntry?s.a.createElement("h1",null,'No results for "',this.props.searchEntry,'"'):""))}}]),t}(n.Component),k=function(e){function t(){return Object(o.a)(this,t),Object(h.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{className:"list-books"},s.a.createElement("div",{className:"list-books-title"},s.a.createElement("h1",null,"MyReads")),s.a.createElement("div",{className:"list-books-content"},s.a.createElement("div",null,s.a.createElement(j,{list:this.props.currentlyReadingList,changeList:this.props.changeList,title:"Currently Reading"}),s.a.createElement(j,{list:this.props.wantToReadList,changeList:this.props.changeList,title:"Want to Read"}),s.a.createElement(j,{list:this.props.readList,changeList:this.props.changeList,title:"Read"}))),s.a.createElement("div",{className:"open-search"},s.a.createElement(v.b,{exact:!0,to:"/search"},s.a.createElement("button",null,"Add a book"))))}}]),t}(n.Component),O=a(0),R=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(h.a)(this,Object(u.a)(t).call(this,e))).state={searchEntry:"",searchResults:[],errorMessage:!1,currentlyReadingList:[],wantToReadList:[],readList:[],allList:[]},a.handleChange=a.handleChange.bind(Object(p.a)(Object(p.a)(a))),a.search=a.search.bind(Object(p.a)(Object(p.a)(a))),a.clearSearch=a.clearSearch.bind(Object(p.a)(Object(p.a)(a))),a.changeList=a.changeList.bind(Object(p.a)(Object(p.a)(a))),a.setCurrentlyReadingList=a.setCurrentlyReadingList.bind(Object(p.a)(Object(p.a)(a))),a.setWantToReadList=a.setWantToReadList.bind(Object(p.a)(Object(p.a)(a))),a.setReadList=a.setReadList.bind(Object(p.a)(Object(p.a)(a))),a.setAllList=a.setAllList.bind(Object(p.a)(Object(p.a)(a))),a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"setCurrentlyReadingList",value:function(){var e=this;L().then(function(t){return e.setState({currentlyReadingList:t.filter(function(e){return"currentlyReading"===e.shelf})})})}},{key:"setWantToReadList",value:function(){var e=this;L().then(function(t){return e.setState({wantToReadList:t.filter(function(e){return"wantToRead"===e.shelf})})})}},{key:"setReadList",value:function(){var e=this;L().then(function(t){return e.setState({readList:t.filter(function(e){return"read"===e.shelf})})})}},{key:"setAllList",value:function(){var e=this;L().then(function(t){return e.setState({allList:t.filter(function(e){return"read"===e.shelf||"wantToRead"===e.shelf||"currentlyReading"===e.shelf})})})}},{key:"componentDidMount",value:function(){this.setCurrentlyReadingList(),this.setWantToReadList(),this.setReadList(),this.setAllList()}},{key:"search",value:function(e){var t,a=this;(t=e,fetch("".concat(m,"/search"),{method:"POST",headers:Object(b.a)({},g,{"Content-Type":"application/json"}),body:JSON.stringify({query:t})}).then(function(e){return e.json()}).then(function(e){return e.books})).then(function(e){a.setState(function(){return{searchResults:[]}}),e.map(function(e){return a.setState({searchResults:Object(i.a)(a.state.searchResults).concat([{id:e.id,shelf:a.state.allList.map(function(e){return e.id}).includes(e.id)?a.state.allList.filter(function(t){return t.id===e.id})[0].shelf:"none",title:e.title,authors:e.authors?e.authors:"N/A",img:e.imageLinks?e.imageLinks.thumbnail:"N/A"}]),errorMessage:!1})})}).catch(function(e){a.setState(function(){return{errorMessage:!0}})})}},{key:"clearSearch",value:function(){this.setState(function(){return{searchEntry:"",searchResults:[]}})}},{key:"handleChange",value:function(e){var t,a=this;this.setState(function(){return{searchEntry:e}}),t&&clearTimeout(t),t=setTimeout(function(){return a.search(a.state.searchEntry)},500)}},{key:"changeList",value:function(e,t){var a=this;(function(e){return fetch("".concat(m,"/books/").concat(e),{headers:g}).then(function(e){return e.json()}).then(function(e){return e.book})})(e).then(function(e){return function(e,t){return fetch("".concat(m,"/books/").concat(e.id),{method:"PUT",headers:Object(b.a)({},g,{"Content-Type":"application/json"}),body:JSON.stringify({shelf:t})}).then(function(e){return e.json()})}(e,t).then(function(){a.setCurrentlyReadingList(),a.setWantToReadList(),a.setReadList()})})}},{key:"render",value:function(){var e=this;return s.a.createElement("div",{className:"app"},s.a.createElement(O.a,{exact:!0,path:"/search",render:function(){return s.a.createElement(E,{clearSearch:e.clearSearch,searchResults:e.state.searchResults,handleChange:e.handleChange,changeList:e.changeList,searchEntry:e.state.searchEntry,errorMessage:e.state.errorMessage})}}),s.a.createElement(O.a,{exact:!0,path:"/",render:function(){return s.a.createElement(k,{changeList:e.changeList,currentlyReadingList:e.state.currentlyReadingList,wantToReadList:e.state.wantToReadList,readList:e.state.readList})}}))}}]),t}(s.a.Component);a(34);c.a.render(s.a.createElement(v.a,null,s.a.createElement(R,null)),document.getElementById("root"))}},[[22,2,1]]]);
//# sourceMappingURL=main.ace2b6e2.chunk.js.map