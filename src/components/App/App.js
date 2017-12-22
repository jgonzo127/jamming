import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify'; 

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      term: '',
      searchResults: '',
      playListName: 'New Playlist',
      playListTracks: {},
      trackURIs: [],
      saving: false
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    const playListTracks = {...this.state.playListTracks};
    const searchResults = {...this.state.searchResults};
    playListTracks[track.id] = track;
    for( let result in searchResults ) {
      if( track.id === searchResults[result].id ) {
        delete searchResults[result];
      }
    }
    this.setState({
      playListTracks,
      searchResults
    });
  }

  removeTrack(track) {
    const playListTracks = {...this.state.playListTracks};
    const searchResults = {...this.state.searchResults};
    searchResults[track.index] = track;
		delete playListTracks[track.id];
		this.setState({ 
      playListTracks,
      searchResults
    });
  }

  updatePlaylistName(name) {
    this.setState({ playListName: name });
  }

  savePlaylist() {
    const tracks = Object.keys(this.state.playListTracks);
    let trackList = [];
    tracks.map( track => {
      return trackList.push(this.state.playListTracks[track].uri );
    });

    this.setState({
      saving: true
    });

    Spotify.savePlayList(this.state.playListName,trackList).then( response => {
      this.setState({
        playListName: 'New Playlist',
        playListTracks: {},
        saving: false
      })
    });
  }

  search(term) {
    if( term ) {
      this.setState({ term: term });
      Spotify.search(term).then( tracks => {
        this.setState({ 
          searchResults: tracks,
        });
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    localStorage.setItem( 'state', JSON.stringify(this.state) );
  }

  componentWillMount() {
    const localStorageRef = localStorage.getItem( 'state' );

    if( localStorageRef ) {
      const updatedState = JSON.parse(localStorageRef);
      this.setState({
        playListName: updatedState.playListName,
        searchResults : updatedState.searchResults,
        term: updatedState.term,
        playListTracks: updatedState.playListTracks
      });
    }
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} term={this.state.term}/>
          <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} addToAdded={this.addToAdded} /> 
          <Playlist onSave={this.savePlaylist} saving={this.state.saving} onNameChange={this.updatePlaylistName} playListName={this.state.playListName} playListTracks={this.state.playListTracks} removeFromAdded={this.removeFromAdded} onRemove={this.removeTrack}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
