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
            index: this.props.index
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
            index: this.props.index
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
                </div>
                {(this.props.preview) ? <iframe title={this.props.id} src={`https://open.spotify.com/embed?uri=${this.props.uri}`} width="200" height="80" frameBorder="0" allowtransparency="true"></iframe> : ''}
                <a className="Track-action" onClick={(this.props.onAdd) ? this.addTrack : this.removeTrack}>{(this.props.onAdd) ? '+' : '-'}</a>
            </div>
        );
    }
}

export default Track;