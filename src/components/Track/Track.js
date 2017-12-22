import React from 'react';
import './Track.css';

class Track extends React.Component {

    constructor(props) {
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }

    addTrack() {
        this.props.onAdd({
            id: this.props.id,
            name: this.props.name,
            artist: this.props.artist,
            album: this.props.album,
            uri: this.props.uri
        });
    }

    removeTrack() {
        this.props.onRemove(this.props.id);
    }

    render() {
        return(
            <div className="Track">
                <div className="Track-information">
                <h3>{this.props.name}</h3>
                <p> {this.props.artist} | {this.props.album} </p>
                </div>
                <a className="Track-action" onClick={(this.props.onAdd) ? this.addTrack : this.removeTrack}>{(this.props.onAdd) ? '+' : '-'}</a>
            </div>
        );
    }
}

export default Track;