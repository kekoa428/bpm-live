// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery2
//= require jquery_ujs
//= require turbolinks
//= require_tree .
//= require 'colorFunctions'
//= require 'musicFunctions'
//= require 'keypress.js'
//= require jquery-ui/effect-shake

var div = ["7","8","9","4","5","6","1","2","3"];
var loadColors = ["#eafaf1","#d5f5e3","#abebc6","#82e0aa","#58d68d","#2ecc71","#28b463","#239b56","#1d8348"];

$(document).ready(function() {

  $("#key-7, #key-8, #key-9, #key-6, #key-3, #key-2, #key-1, #key-4, #key-5").hide().each(function(i) {
    $(this).delay(i*200).fadeIn(200);
    showColor(div[i], loadColors[i]);
  });

  $('#play-track').click(function(event) {
    event.preventDefault();
    console.log(tracks);
    playTracks(tracks);
  })

  $('#stop-track').click(function(event) {
    event.preventDefault();
    stopSwitch();
    console.log(stop);
  })

  // Records a track on click
  $('#record').click(function(event) {
    event.preventDefault();
    record();
  })

  // Removes last track recorded
  $('#undo').click(function(event) {
    event.preventDefault();
    undo();
  })

  // save
  $("#save").click(function(e) {
    console.log("Save clicked, prevent default")
    e.preventDefault();
    var name = prompt("Your track is lonely! Give it a name.")

    $.ajax({
      url: '/tracks',
      data: {'track': tracks},
      method: 'post'
    })
  })

  // play track from user profile
  $(".play-track-from-user-profile").click(function(e) {
    e.preventDefault();
    var play_button_clicked = $(this);
    var id_of_track_to_play = play_button_clicked.attr('id');
    console.log(id_of_track_to_play);

    $.ajax({
      url: "/tracks/" + id_of_track_to_play
    })
      .done(function(response){
        console.log(response);
      })
  })

  // Loops tracks
  $('#loop-track').click(function(event) {
    event.preventDefault();
    var oldInterval = interval;

    if (looping) {
      looping = false;
      clearInterval(trackLoop);
    }
    else {
      interval = oldInterval;
      looping = true;
      playTracks(tracks);
      trackLoop = setInterval(function() {
        playTracks(tracks);
      }, interval)
    }
  });

});
