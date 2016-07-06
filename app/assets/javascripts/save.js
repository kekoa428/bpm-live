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
    var name = prompt("Your track is lonely! Give it a name.")
    $.ajax({
      url: '/tracks',
      data: {'track': track, 'name': name},
      method: 'post'
    })
  })
}
