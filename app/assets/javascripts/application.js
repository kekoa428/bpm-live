//= require colors
//= require jquery2
//= require jquery_ujs
//= require jquery-ui/effect-shake
//= require_tree .
//= require 'globals'
//= require 'save'
//= require 'instruction'
//= require 'colorFunctions'
//= require 'musicFunctions'
//= require 'keypress'
//= require 'js.cookie'

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

var colorSwatch = randomColorSwatch();

function colorSweep(colorSwatch) {
  for (var i = 0; i < div.length; i++) {
    colorFade(i*200, div[i], colorSwatch[i]);
    setTimeout(fadeToBlack, i*200 + 300, div[i]);
  }
}

$(document).ready(function() {
  // Fade in divs on load of page
  $("#key-7, #key-8, #key-9, #key-6, #key-3, #key-2, #key-1, #key-4, #key-5").each(function(i) {
    var css_selector = "#key-" + div[i];
    $(css_selector).css('visibility', 'hidden');
    colorFade(i*200, div[i], colorSwatch[i]);
    setTimeout(fadeToBlack, i*200 + 300, div[i]);
  });

  resetIdleTimer();

  // bind keypress functions
  bindKeyUp();
  bindKeyDown();

  // for overlay of keypress instructions
  displayIntructions();
  bindClickEvents();

  $(document).on('click', '.home-link', function(e){
    rebindKeys();
  });

  $(document).on('focus', 'input', function(e){
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
  $(".play-track-from-user-profile").click(function(event) {
    event.preventDefault();
    var trackId = $(this).closest('div').attr('id');
    $.ajax({
      url: "/tracks/" + trackId
    })
      .done(function(response){
        playableTrack = formatTrack(response);
        playTrack(playableTrack);
      })
  })

  // delete track from user profile
  $(".delete-track").click(function(event) {
    event.preventDefault();
    var trackId = $(this).parent('div').attr('id');
    $.ajax({
      url: "/tracks/" + trackId,
    })
      .done(function() {
        $('#' + trackId).remove();
      });
  })


  // Loops tracks
  $('#loop-track').click(function(event) {
    event.preventDefault();
    if (looping) {
      looping = false;
      loopingColor();
      clearInterval(trackLoop);
      console.log("Looping Stopped")
    }
    else {
      looping = true;
      loopingColor();
      console.log("Looping Started")
      playTrack(track);
      trackLoop = setInterval(function() {
        newInterval();
        playTrack(track);
        console.log(track);
      }, interval)
    }
  });


  $('.nav-right').on('click', function() {
    $(this).css('color', 'gray');
      setTimeout(function() { $('.nav-right').css('color', 'white'); }, 50);
  })

});



