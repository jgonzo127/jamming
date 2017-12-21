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
                        <Track key={this.props.tracks[track].id} id={this.props.tracks[track].id} name={this.props.tracks[track].name} artist={this.props.tracks[track].artist} album={this.props.tracks[track].album} onAdd={this.props.onAdd} onRemove={this.props.onRemove} /> 
                    ) 
                }
            </div>
        );
    }
}

export default TrackList;