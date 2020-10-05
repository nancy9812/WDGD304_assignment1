document.addEventListener("DOMContentLoaded", function () {
  const db = firebase.firestore();
  const form = document.getElementById("form");
  const songtitle = document.getElementById("song-title");
  const songartist = document.getElementById("song-artist");

  // on submit, it gets the form details
  form.addEventListener("submit", function (event) {
    // don't do things after form submits
    event.preventDefault();

    console.log(event);

    if (songtitle.value && songartist.value) {
      addSong(songtitle.value, songartist.value);
      // clear the input field
      songtitle.value = "";
      songartist.value = "";
      getSongs();
    }
  });

  function addSong(title, artist) {
    // check the value of the two inputs
    console.log('Song Title: ', title);
    console.log('Song Artist: ', artist);

    // add the form value into the database
    db.collection("Songs")
      .add({
        songtitle: title,
        songartist: artist,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      // gives back a ref for the songs inputted
      .then(function (docRef) {
        console.log("Document Written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.log("Error Adding Document: ", error);
      });
  }

  function getSongs() {
    db.collection("Songs")
      .orderBy("timestamp")
      .get()
      .then(function (snapshot) {
        let output = 
        `<div class="song-container">
          <h2 class="label">Song Title</h2>
          <h2 class="label">Song Artist</h2>
        </div>`;

        snapshot.forEach(song => {
          output += 
          `<div class="song-container">
            <h2>${song.data().songtitle}</h2> 
            <h2> ${song.data().songartist}</h2>
          </div>`;
          // console.log("song: ", song.data());
        });
        document.getElementById("songs").innerHTML = output;
      });
  };
  getSongs();
});