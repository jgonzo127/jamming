const clientId = '206e16d9d7b64e328a3c93bbe8831119';
const redirect_uri = 'http://localhost:3000/';
const Spotify = {
    getAccessToken() {
        const callback = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirect_uri}&scope=playlist-modify-public&response_type=token&state=123`;
        let accessToken = window.location.href.match( /access_token=([^&]*)/ );
        const expiration = window.location.href.match( /expires_in=([^&]*)/ );

        if( accessToken ) {
            // Set access token to expire
            window.setTimeout(() => accessToken = '', (expiration[1] * 1000) );
            window.history.pushState('Access Token', null, '/'); 
            return accessToken[1];
        } else {
            window.location = callback;
        }

    },

    search(term) {
        const accessToken = Spotify.getAccessToken();

        return fetch( `https://api.spotify.com/v1/search?type=track&q=${term}`, { headers: {Authorization: `Bearer ${accessToken}`} } ).then( response => {
            return response.json();
        }).then( jsonResponse => {
            if( jsonResponse.tracks.items ) {
                return jsonResponse.tracks.items.map( track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                }));
            }
        }); 
    },

    savePlayList(name, trackURIs ) {
        if ( ! name || ! trackURIs ) {
            //return;
        }

        const accessToken = Spotify.getAccessToken();
        const headers = {Authorization: `Bearer ${accessToken}`};
        let userId = '';
        
        fetch( 'https://api.spotify.com/v1/me', {headers: headers} ).then( response => {
            return response.json();
        }).then( jsonResponse => {
            if( jsonResponse.id ) {
                userId = jsonResponse.id;
                console.log(userId);
            }
        });

        fetch( `https://api.spotify.com/v1/users/${userId}/playlists`, {headers: {Authorization: `Bearer ${accessToken}`, ContentType: 'application/json' } } ).then( response => {

        });
    }
}

export default Spotify;