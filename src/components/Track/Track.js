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
            id: this.props.track.id,
            name: this.props.track.name,
            artist: this.props.track.artist,
            album: this.props.track.album,
            uri: this.props.track.uri,
            preview: this.props.track.preview,
            index: this.props.track.index,
            albumImg : this.props.track.albumImg,
            term: this.props.track.term
        });

    }

    removeTrack() {
        this.props.onRemove({
            id: this.props.track.id,
            name: this.props.track.name,
            artist: this.props.track.artist,
            album: this.props.track.album,
            uri: this.props.track.uri,
            preview: this.props.track.preview,
            index: this.props.track.index,
            albumImg : this.props.track.albumImg,
            term: this.props.track.term
        });
    }

    render() {
        const album = this.props.track.album;
        const length = 25;

        return(
            <div className="Track">
                <div className="Track-information">
                <h3>{this.props.track.name}</h3>
                <p> {this.props.track.artist} | {(album.length > length ) ? album.substring(0, length - 3 ) + '...' : album} </p>
                {(this.props.track.preview) ? <audio controls><source src={this.props.track.preview} type="audio/mp3" /></audio> : ''}
                </div>
                {(this.props.track.albumImg) ? <img src={this.props.track.albumImg} alt="album art"/> : ''}
                <a className="Track-action" onClick={(this.props.onAdd) ? this.addTrack : this.removeTrack}>{(this.props.onAdd) ? '+' : '-'}</a>
            </div>
        );
    }
}

export default Track;