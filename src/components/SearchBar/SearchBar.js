import React from 'react';
import './SearchBar.css'; 

class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            term: ''
        };
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleTermChange(event) {
        event.preventDefault();
        this.setState({ term: event.target.value });
    }

    handleSearch() {
        if( '' !== this.state.term ) {
            this.props.onSearch(this.state.term);
        }
    }

    render() {
        return(
            <div className="SearchBar">
                <input onChange={this.handleTermChange} value={this.state.term} placeholder="Enter A Song, Album, or Artist" />
                <a onClick={this.handleSearch}>SEARCH</a>
            </div>
        )
    }
}

export default SearchBar;