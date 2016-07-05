// when guest clicks save
function guestSave() {
  $("#save-guest-button").click(function(e) {
    e.preventDefault();
    $(".save-popup").css("display", "block");
    console.log("Guest tracks var:");
    console.log(tracks);
    Cookies.set("guest_track", tracks, {expires: 1, path: "/"});

    console.log("Cookies:");
    console.log(Cookies.get('guest_track'));

    // need different code to test if cookies cleared:
      Cookies.remove("guest_track", {path: "/"});

      if (typeof Cookies.get('guest_track') === "undefined") {
        console.log("empty");
      }

      console.log(Cookies.get());

  })
};

// save
function saveTrack() {
  $("#save").click(function(e) {
    console.log("Save clicked, prevent default")
    e.preventDefault();

    // if cookie not empty, i.e. there is a guest_track
    if (JSON.stringify(Cookies.get()) !== JSON.stringify({})) {
      // set track = guest_track
      tracks = Cookies.get('guest_track')
    }

    // send track back to DB (an array of layer objects).tracks is the recording
    var name = prompt("Your track is lonely! Give it a name.")
    console.log("Tracks var:");
    console.log(tracks);
    $.ajax({
      url: '/tracks',
      data: {'track': tracks, 'name': name},
      method: 'post'
    })
  })
}
