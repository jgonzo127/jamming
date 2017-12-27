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
                        <Track track={this.props.tracks[track]} key={this.props.tracks[track].id} onAdd={this.props.onAdd} onRemove={this.props.onRemove} />
                        
                    ) 
                }
            </div>
        );
    }
}

export default TrackList;