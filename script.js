// elements
const searchInput = document.getElementById('search');
const resultCount = document.getElementById('count');
const searchResult = document.querySelector('.search-result .row');

// search song
function searchSong() {

    // fetching song details
    fetch(`https://api.lyrics.ovh/suggest/${searchInput.value}`)
        .then(response => response.json())
        .then(info => {
            if (searchResult.children.length == 10) {
                searchResult.innerHTML = '';
            }
            for (let i = 0; i < 10; i++) {
                const song = info.data[i];
                displayDetails(info.total, song);
            }
        });
    searchInput.value = '';
}

// displaying song details
function displayDetails(total, song) {
    const div = document.createElement('div');

    // displaying total result
    resultCount.innerText = `${total} songs found`;

    // displaying song title, album, artist, photo
    div.classList.add('col-lg-6');
    div.innerHTML =
        `<div id="song-${song.id}" class="single-result row justify-content-center align-items-center text-center m-3 p-3">
            <div class="col-md-12">
                <h3 class="mb-3">${song.title}</h3>
                <p class="lead">Duration : ${Math.floor(song.duration/60)}:${song.duration%60}</p>
                <p class="lead">Album : ${song.album.title}</p>
                <p class="lead">Artist : ${song.artist.name}</p>
                <img src="${song.artist.picture}" class="rounded-circle mb-3">
            </div>
            <div class="col-md-12 text-center">
                <button id="button-${song.id}" class="btn btn-success">Get Lyrics</button>
            </div>
        </div>`;
    searchResult.appendChild(div);

    // get lyrics button
    document.getElementById(`button-${song.id}`).addEventListener('click', () => {

        // fetching song lyrics
        fetch(`https://api.lyrics.ovh/v1/${song.artist.name}/${song.title}`)
            .then(response => response.json())
            .then(info => {
                const lyricsResult = document.getElementById(`song-${song.id}`);
                lyricsResult.classList.add('lyricsResult');

                // checking if we have that lyrics
                if (info.error) {
                    lyricsResult.innerHTML = "Sorry, our API doesn't have this lyrics at this moment";
                } else {
                    lyricsResult.innerHTML = `<pre class="text-white">${info.lyrics}</pre>`;
                };
            });
    });
}