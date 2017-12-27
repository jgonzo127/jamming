const clientId = '206e16d9d7b64e328a3c93bbe8831119';
const redirect_uri = 'http://localhost:3000/';
let accessToken;

const Spotify = {
    getAccessToken() {

        if( accessToken ) {
            return accessToken;
        }

        const accessTokenMatch = window.location.href.match( /access_token=([^&]*)/ );
        const expirationMatch = window.location.href.match( /expires_in=([^&]*)/ );
        
        if( accessTokenMatch && expirationMatch ) {
            accessToken = accessTokenMatch[1];
            const expiration = Number(expirationMatch[1]);
             // Set access token to expire
             window.setTimeout(() => accessToken = '', expiration * 1000 );
             window.history.pushState('Access Token', null, '/jamming/'); 
             return accessToken;
        } else {
            const callback = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirect_uri}&scope=playlist-modify-public&response_type=token&state=123`;
            window.location = callback;
        }

    },

    search(term) {
        const accessToken = Spotify.getAccessToken();

        return fetch( `https://api.spotify.com/v1/search?type=track&q=${term}`, { headers: {Authorization: `Bearer ${accessToken}`} } ).then( response => {
            return response.json();
        }).then( jsonResponse => {
            console.log(jsonResponse.tracks.items);
            if( jsonResponse.tracks.items ) {
                return jsonResponse.tracks.items.map( (track, i) => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri,
                    preview: track.preview_url,
                    index: i,
                    albumImg : track.album.images[1].url,
                    term: term
                }));
            }
        }); 
    },

    savePlayList(name, trackURIs ) {
        if ( ! name || ! trackURIs.length ) {
            return;
        }

        const accessToken = Spotify.getAccessToken();
        const headers = {Authorization: `Bearer ${accessToken}`};
        let userId = '';
        let playListId = '';
        
        return fetch( 'https://api.spotify.com/v1/me', {headers: headers} ).then( response => {
            return response.json();
        }).then( jsonResponse => {
            if( jsonResponse.id ) {
                userId = jsonResponse.id;
                return fetch( 
                    `https://api.spotify.com/v1/users/${userId}/playlists`, 
                    {   method: 'post',
                        headers: {Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json'},
                        body : JSON.stringify({name: name}) 
                    }).then( response => response.json()
                    ).then( jsonResponse => {
                        if( jsonResponse.name ) {
                            playListId = jsonResponse.id;
                            return fetch( `https://api.spotify.com/v1/users/${userId}/playlists/${playListId}/tracks`,
                        { method: 'post',
                            headers: {Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json'},
                            body: JSON.stringify({ uris : trackURIs })
                        });
                    }
                        
                });
            }
        });

    }
}

export default Spotify;
