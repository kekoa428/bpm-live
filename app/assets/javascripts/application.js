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

$(document).ready(function() {

  // Return square to black when key is depressed
  $('body').keyup(function(event) {
    var element_id = '#key-' + (event.keyCode - 48).toString();
    $(element_id).css('background-color', 'black');
  })

  // Change box color when key is pressed
  $('body').keydown(function(event) {
    var key_code = event.keyCode;
    var color = randomColor();
    playKeypress(key_code, color);

    if (recording) {
      this_press_timestamp = new Date().getTime();
      recordBeat(key_code, last_press_timestamp, this_press_timestamp, color);
      last_press_timestamp = this_press_timestamp;
    }
  });

  // Records a track on click
  $('#record').click(function(event) {
    event.preventDefault();
    record();
  })

  // Plays/Records tracks/track
  $('#play-track').click(function(event) {
    event.preventDefault();
    playAndRecord(tracks);
    console.log(tracks);
  })
});
