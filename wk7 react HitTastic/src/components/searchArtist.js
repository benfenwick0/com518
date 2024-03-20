import React from 'react';

function SearchArtist() {

    const [artist, setArtist] = React.useState("");
	const [songs, setSongs] = React.useState([]);

	const songsHtml = songs.map(currSong => <li key={currSong.id}>{currSong.artist}, {currSong.title}, {currSong.year}</li>);

    return(
        <div>
        <h2>Search for Artist</h2>
        <input id='searchArtist' type='text'/>
        <div></div>
        <input type='button' id='Search' value='Search' onClick={updateStateResults} />
		<h2>Results:</h2>
		<ul>
			{songsHtml}
		</ul>
		</div>
    );

	function updateStateResults(){
		const a = document.getElementById("searchArtist").value;
	    setArtist(a);
		ajaxSearch(a);
	}

    async function ajaxSearch(artist) {
		const ajaxResponse = await fetch(`/artist/${artist}`);
		const songs = await ajaxResponse.json();
		setSongs(songs);
    }
}

export default SearchArtist;