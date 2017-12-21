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
      trackURIs: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    const playListTracks = {...this.state.playListTracks};
    playListTracks[track.id] = track;
    this.setState({
      playListTracks
    });
  }

  removeTrack(track) {
    const playListTracks = {...this.state.playListTracks};
		delete playListTracks[track];
		this.setState({ 
      playListTracks 
    });
  }

  updatePlaylistName(name) {
    this.setState({ name: name });
  }

  savePlaylist() {
    /*let tracks = this.state.playListTracks;
    let trackURIs = [];
    tracks.map( track => {
      return trackURIs.push(track.uri);
    });

    this.setState({ trackURIs : trackURIs });
    */

    Spotify.savePlayList(this.state.playListName,this.state.trackURIs);
    this.setState({
      playListName: 'New Playlist',
      searchResults : ''
    })
  }

  search(term) {
    if( term ) {
      this.setState({ term: term });
      Spotify.search(term).then( tracks => {
        this.setState({ searchResults: tracks });
      });
    }
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} /> 
          <Playlist onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} playListName={this.state.playListName} playListTracks={this.state.playListTracks} onRemove={this.removeTrack}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
