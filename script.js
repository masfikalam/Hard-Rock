// dom elements
const input = document.querySelector("input");
const results = document.querySelector("main");

// search music
function searchMusic() {
  results.innerHTML = "<h3>Loading...</h3>";

  fetch(`https://api.lyrics.ovh/suggest/${input.value}`)
    .then((response) => response.json())
    .then(({ data }) => {
      results.innerHTML = "";
      data.forEach((music) => displayDetails(music));
    })
    .catch(() => {
      results.innerHTML = "<h3>Something went wrong!</h3>";
    });
}

// music details
function displayDetails(music) {
  const div = document.createElement("div");
  div.setAttribute("id", `music-${music.id}`);
  div.classList.add("card");
  div.innerHTML = `
  <div class="details">
    <div>
      <img src="${music.album.cover_medium}" />
    </div>

    <div>
      <h3>${music.title}</h3>
      <p>Album : ${music.album.title}</p>
      <p>Artist : ${music.artist.name}</p>
      <button onclick="displayLyrics(this, '${music.artist.name}', '${music.title}', '${music.id}')">Lyrics</button>
    </div>
  </div>`;
  results.appendChild(div);
}

// music lyrics
function displayLyrics(target, artist, title, id) {
  fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    .then((response) => response.json())
    .then((info) => {
      const para = document.createElement("p");
      const horz = document.createElement("hr");
      para.style.color = "#ddd0ff";
      const card = results.querySelector(`#music-${id}`);
      para.innerText = info.lyrics ? info.lyrics : "Lyrics not found!";

      target.style.display = "none";
      card.appendChild(horz);
      card.appendChild(para);
    });
}
