import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component { 

    render() {

        const tracks = Object.keys( this.props.tracks );
        
        return(
            <div className="TrackList">
                { 
                    tracks.map( track => 
                        <Track key={this.props.tracks[track].id} id={this.props.tracks[track].id} name={this.props.tracks[track].name} uri={this.props.tracks[track].uri} artist={this.props.tracks[track].artist} album={this.props.tracks[track].album} albumImg={this.props.tracks[track].albumImg} index={this.props.tracks[track].index} preview={this.props.tracks[track].preview} term={this.props.tracks[track].term} onAdd={this.props.onAdd} addedTracks={this.props.addedTracks} onRemove={this.props.onRemove} />
                        
                    ) 
                }
            </div>
        );
    }
}

export default TrackList;