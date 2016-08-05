
function guestSave() {
  $("#save-guest-button").click(function(e) {
    e.preventDefault();
    $(".save-popup").css("display", "block");
    Cookies.set("guest_track", track, {expires: 1, path: "/"});
  })
}

function clearCookies() {
  Cookies.remove('guest_track', { path: '/' });
}

function saveTrack() {
  $("#save").click(function(e) {
    e.preventDefault();
    $(this).css('color', 'gray');
    setTimeout(function() { $('#save').css('color', 'white'); }, 200);
    if ((typeof Cookies.get('guest_track') !== "undefined") && (track.length === 0)) {
      var cookies = Cookies.get('guest_track');
      track = JSON.parse(cookies);
    }
    var name = prompt("Name your track?");
    $("#my-tracks-button").css('color', 'yellow');
    setTimeout(function() { $("#my-tracks-button").css('color', 'white'); }, 1600);
    $.ajax({
      url: '/tracks',
      data: {'track': track, 'name': name},
      method: 'post'
    })
      .done(function(response) {
        clearCookies();
        track = [];
    })
  })
}
