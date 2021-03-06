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
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleTermChange(event) {
        event.preventDefault();
        this.setState({ term: '' });
        this.setState({ term: event.target.value });
    }

    handleSearch(event) {
        event.preventDefault();
        if( '' !== this.state.term ) {
            this.props.onSearch(this.state.term);
        }
    }

    handleSubmit(event) {
        if( event.key === 'Enter' ) {
            this.props.onSearch(this.state.term);
        }
    }

    componentWillMount() {
        const localStorageRef = localStorage.getItem( 'state' );
    
        if( localStorageRef ) {
          const updatedState = JSON.parse(localStorageRef);
          this.setState({
            term: updatedState.term
          });
        }
      }

    render() {
        return(
            <div className="SearchBar">
                <input onChange={this.handleTermChange} onKeyPress={this.handleSubmit} value={this.state.term} placeholder="Enter A Song, Album, or Artist" />
                <a onClick={this.handleSearch}>SEARCH</a>
            </div>
        )
    }
}

export default SearchBar;