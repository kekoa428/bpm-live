// when guest clicks save
function guestSave() {
  $("#save-guest-button").click(function(e) {
    e.preventDefault();
    $(".save-popup").css("display", "block");

    console.log("In Guest save.. tracks var:");
    console.log(tracks);

    Cookies.set("guest_track", tracks, {expires: 1, path: "/"});

    console.log("In Guest save.. cookies:");
    console.log(Cookies.get('guest_track'));

    // this is a way to test if cookies cleared:
      // Cookies.remove("guest_track", {path: "/"});
      // if (typeof Cookies.get('guest_track') === "undefined") {
      //   console.log("empty");
      // }

  })
};

// save
function saveTrack() {
  $("#save").click(function(e) {
    e.preventDefault();

    console.log("tracks before function. should be undefined b/c haven't recorded anything");
    console.log(tracks);

    // if cookie not empty, there is a guest_track
    if (typeof Cookies.get('guest_track') !== "undefined") {
      // set tracks = guest_track
      var cookies = Cookies.get('guest_track');
      var tracks = JSON.parse(cookies);
    }

    console.log("tracks after function.. should be same as cookies");
    console.log(tracks);

    // send track back to DB (an array of layer objects).tracks is the recording
    var name = prompt("Your track is lonely! Give it a name.");

    $.ajax({
      url: '/tracks',
      data: {'track': tracks, 'name': name},
      method: 'post'
    })
  })
}
