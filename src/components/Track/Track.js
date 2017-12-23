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
            uri: this.props.uri,
            preview: this.props.preview,
            index: this.props.index,
            albumImg : this.props.albumImg,
            term: this.props.term
        });

    }

    removeTrack() {
        this.props.onRemove({
            id: this.props.id,
            name: this.props.name,
            artist: this.props.artist,
            album: this.props.album,
            uri: this.props.uri,
            preview: this.props.preview,
            index: this.props.index,
            albumImg : this.props.albumImg,
            term: this.props.term
        });
    }

    render() {
        const album = this.props.album;
        const length = 25;

        return(
            <div className="Track">
                <div className="Track-information">
                <h3>{this.props.name}</h3>
                <p> {this.props.artist} | {(album.length > length ) ? album.substring(0, length - 3 ) + '...' : album} </p>
                {(this.props.preview) ? <audio controls><source src={this.props.preview} type="audio/mp3" /></audio> : ''}
                </div>
                {(this.props.albumImg) ? <img src={this.props.albumImg} alt="album art"/> : ''}
                <a className="Track-action" onClick={(this.props.onAdd) ? this.addTrack : this.removeTrack}>{(this.props.onAdd) ? '+' : '-'}</a>
            </div>
        );
    }
}

export default Track;