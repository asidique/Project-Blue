import React from 'react'
import './Search.css'


class Search extends React.Component {
    handleSubmit(txt) {
      this.props.addFilter(txt);
    }
    handleChange(event) {
      //console.log(event.target.value);
      var a = event.target.value;
      this.handleSubmit(event.target.value)
      this.setState({
        userInput: event.target.value
      }, () => {this.props.addFilter(a)});
    }
    constructor(props) {
      super(props);
      this.state = {
        userInput: ""
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }

    render() {
      return(
      <div className="Marketplace-SearchContainer">
        <form>
          <input type="text" className="Marketplace-Searchbar" placeholder="Type here to Search" onChange={this.handleChange}  />
          <img className="Marketplace-Searchbar-Icon" src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAANlBMVEX///+/v7/8/Pz19fXCwsLKysrFxcX4+PjMzMzQ0NDk5OTc3Nzf39/Hx8fW1tbR0dHw8PDq6uqixblZAAADbklEQVRogd2a6bLqIAyALdBC2Urf/2WvdTnjyQIBqzPn5rf4mRWSeLnUxBYf1nkx0zSZZd6CL7b6+W5R2uf5+PpXMXP2Wp2FsH5bJlqWbT9FHx0SQ7jLHPWnEYek+JY2yrcRN238uG/KKkJcxWyDNlOeczdpsyFlbIYx21Am9FP01oU4JPf6X7tuxjStfY4ZYnRSBhnTtMktZvv98ZQs9b4Kw4xpikKIZ2M3uRxiDCE7NoXMLmIUppTMYf+p7ErvXFGbJc5XpEPMimq69SupssQtnjroduqk8vOYwTRxzgQuMm0glHHNOCYiK1V+GllFfUsR7M65VE/sxImGKrGXQUZjXRWLPJJajKsuyGJrNcBQaIlyC2Vv9RTOkSBgXFSGx3Ll0xoq3o7G+zlo5ZrrobWEhajvIFS77sAXsfAC4s2MYkuqCFaF/3kFREkrqV4EJnFiazH8OaLQegiwtGHTC9YtubXwD2STHmQJrzIh0NSsFYDfxbF1CAwaNh0X4ecoUeBxvnEflGpMCvA8awbgO+nr5i4gatz/D/mKT96KLpBkGwd5J0+UNE9AqHdlPLzvWFvDItdTu/bfZ/na9ZUqDIuc8IY/BN4nC2tqWOQ67CW/GdHTho1DdBLOLiqWPu21UrvvoFOkqYIeK6niTaS1rH7hTrZaLJDai8Rge9dbmGhPmp0D1Ts0Yh83Wq5VXApuAButVsHdWYNCMJpFD3UBDYsR3Vw7WqhRwRK5SB7sfomu8SprIfv4nZwmCcIeJdZNTEbjArVv9BBGMvVCUf/AuFjsz2zFluDYOU8zIC+MwW6ceQvRex/zmqpTUAGFHuF0iWun8PB0sItCJFivDJWjj1De10UwMCnv+0VAGZijI0r7MlJUXTqfQpemkynXIitboSQ2GEXXdxFsUZagNbszElFUyXVtUjiCqEJpjT3voiNbcM36XADyFCOjXNUJKzK7SVt8ucvep9ym89cK79JySHJr8DvYyfILETnlRlJWH2IVdRvXKKftiGsU9ikyQCEeVH+VgkfEP5SBZWc/Zfp7FH659xVKX1aOUkSrOzGFq6h9M7QGJTIUdyKEpZgzISzlVAhDOVeTYwVJUNLJEHId3jXXHKTws7YTKeI/HvRRfr2nJM3kiLyuUwUty6CU518DTP6QHoeo4z9oJj0GAf8AJ64kOMYO0KsAAAAASUVORK5CYII="} />
        </form>
      </div>
      )
    }
}

export default Search;
