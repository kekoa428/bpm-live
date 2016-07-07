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
//= require colors
//= require jquery2
//= require jquery_ujs
//= require_tree .
//= require 'save'
//= require 'instruction'
//= require 'colorFunctions'
//= require 'musicFunctions'
//= require 'keypress.js'
//= require jquery-ui/effect-shake
//= require 'js.cookie'

var div = ["7","8","9","6","3","2","1","4","5"];
var order = ["#key-7", "#key-8", "#key-9", "#key-6", "#key-3", "#key-2", "#key-1", "#key-4", "#key-5"];
var loadColors = ["#eafaf1","#d5f5e3","#abebc6","#82e0aa","#58d68d","#2ecc71","#28b463","#239b56","#1d8348"];

var getValues = function(obj) {
  var values = [];
  for (var key in obj) { values.push(obj[key]) }
  return values;
}

function randomColorSwatch() {
  var keys = Object.keys(colorSwatches);
  var key = keys[Math.floor(keys.length * Math.random())];
  return getValues(colorSwatches[key]);
}

function colorFade(delay, id, color) {
  setTimeout(fadeToColor, delay, id, color);
}

function colorSweep(colorSwatch) {
  for (var i = 0; i < div.length; i++) {
    colorFade(i*200, div[i], colorSwatch[i]);
    setTimeout(fadeToBlack, i*200 + 300, div[i]);
  }
}

var colorSwatch = randomColorSwatch();

$(document).ready(function() {

  // Fade in divs on load of page
  $("#key-7, #key-8, #key-9, #key-6, #key-3, #key-2, #key-1, #key-4, #key-5").each(function(i) {
    var css_selector = "#key-" + div[i];
    $(css_selector).css('visibility', 'hidden');
    // $(css_selector).delay(i*600).fadeIn(200);
    // showColor(div[i], loadColors[i]);
    colorFade(i*200, div[i], colorSwatch[i]);
    //setTimeout(fadeInBorder, i*200+1000, div[i]);
    setTimeout(fadeToBlack, i*200 + 300, div[i]);
  });

  resetIdleTimer();

  // bind keypress functions
  bindKeyUp();
  bindKeyDown();

  // for overlay of keypress instructions
  displayIntructions();

  // $('.home-link').on('click', function(e){
  $(document).on('click', '.home-link', function(e){
    console.log('EVENT HANDLER - rebinding keys');
    console.log(this);
    rebindKeys();
  });

  $(document).on('focus', 'input', function(e){
    console.log('EVENT HANDLER - unbind keys');
    console.log(this);
    unbindKeys();
  });

  // This is the end of the binding functinality
  $('#record').click(function(event) {
    event.preventDefault();
    record();
  })

  $('#play-track').click(function(event) {
    event.preventDefault();
    playTrack(track);
  })

  $('#stop-track').click(function(event) {
    event.preventDefault();
    stopSwitch();
  })


  // Removes last track recorded
  $('#undo').click(function(event) {
    event.preventDefault();
    undo();
  })

  $('#switch_sounds').click(function(event) {
    event.preventDefault();
    switchSounds();
  })

  guestSave();

  saveTrack();

  // play track from user profile
  $(".play-track-from-user-profile").click(function(e) {
    e.preventDefault();
    var play_button_clicked = $(this);
    var id_of_track_to_play = play_button_clicked.attr('id');

    $.ajax({
      url: "/tracks/" + id_of_track_to_play
    })
      .done(function(response){
        playableTrack = formatTrack(response);
        playTrack(playableTrack);
      })
  })

  // Loops tracks
  $('#loop-track').click(function(event) {
    event.preventDefault();
    oldInterval = interval;
    console.log(oldInterval, "oldInterval");

    if (looping) {
      console.log(interval, "stopping loop");
      looping = false;
      clearInterval(trackLoop);
      console.log("Looping Stopped")
    }
    else {
      interval = oldInterval;
      looping = true;
      console.log(interval, "starting loop");
      console.log("Looping Started")
      playTrack(track);
      trackLoop = setInterval(function() {
        playTrack(track);
        console.log(track);
      }, interval)
    }
  });
});
