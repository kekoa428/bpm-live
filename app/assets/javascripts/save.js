// when guest clicks save
function guestSave() {
  $("#save-guest-button").click(function(e) {
    e.preventDefault();
    $(".save-popup").css("display", "block");
  })
};

// save
function saveTrack() {
  $("#save").click(function(e) {
    console.log("Save clicked, prevent default")
    e.preventDefault();

    // send track back to DB (an array of layer objects).tracks is the recording

    // ask for name here?
    var name = prompt("Your track is lonely! Give it a name.")
    $.ajax({
      url: '/tracks',
      data: {'track': track},
      method: 'post'
    })
  })
}
