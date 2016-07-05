// when guest clicks save
function guestSave() {
  $("#save-guest-button").click(function(e) {
    e.preventDefault();
    $(".save-popup").css("display", "block");
    console.log("Guest tracks var:");
    console.log(tracks);
    // Cookies.set("guest_track", tracks, {explires: 1, path: "/"});
  })
};

// save
function saveTrack() {
  $("#save").click(function(e) {
    console.log("Save clicked, prevent default")
    e.preventDefault();

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
