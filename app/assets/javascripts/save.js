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

  })
};

// if i click record, clear all cookies (make sure Cookies.get('guest_track') is undefined after clear)
function ifClickRecordClearCookies() {
  $("#record").click(function(e) {
      e.preventDefault();
      console.log("RECORD CLICKED");

      // Cookies.remove('guest_track', { path: '' });
      // console.log("After wipe tracks");
      // console.log(tracks);
    })
};

// save
function saveTrack() {
  $("#save").click(function(e) {
    e.preventDefault();

    console.log("tracks before function. should be undefined b/c haven't recorded anything");
    console.log(tracks);

    // if i click record, clear all cookies (make sure Cookies.get('guest_track') is undefined after clear)


    // if i click logout, clear all cookies (make sure Cookies.get('guest_track') is undefined after clear)

    // if cookie not empty, there is a guest_track. &&..
    // if track is blank, i didn't try recording something else since i logged in.
    if ((typeof Cookies.get('guest_track') !== "undefined") && (tracks.length === 0)){
      // set tracks = guest_track
      var cookies = Cookies.get('guest_track');
      tracks = JSON.parse(cookies);
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

    .done(function(response) {
      // clear cookies after save a track (make sure Cookies.get('guest_track') is undefined after clear)

    })
  })
}
