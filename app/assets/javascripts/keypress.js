var colorSweepTimeout;

function resetIdleTimer() {
  clearInterval(colorSweepTimeout);
  //colorSweep(colorSwatch[i]);
  colorSweepTimeout = setInterval(colorSweep, 10000, randomColorSwatch());
}

function bindKeyUp() {
  $(document).keyup(function(event) {
    resetIdleTimer();
    var element_id = '#key-' + (event.keyCode - 48).toString();
    // add delay
    setTimeout(function(){
      $(element_id).css('background-color', 'black');
    }, 3000);
  })
};

function bindKeyDown() {
  // this binding will allow for color change and sound play
  $(document).keydown(function(event) {
    var key_code = event.keyCode;
    var color = randomColor();
    var sound = 0;
    if (differentSounds) { sound = 1; }
    playKeypress(key_code, color, sound);


    if (recording) {
      this_press_timestamp = new Date().getTime();
      recordBeat(key_code, last_press_timestamp, this_press_timestamp, color, sound);
      last_press_timestamp = this_press_timestamp;
    }
  });

  $(document).keydown(function(event) {
    if (event.keyCode == 82) {        // r
      record();
    } else if (event.keyCode === 80) { // p
      playTracks(tracks);
    } else if (event.keyCode === 88) { // x
      console.log("in the stop keys handler");
      stopSwitch();
    } else if (event.keyCode === 85) { // u
      undo();
    } else if (event.keyCode === 83) { // s
      saveTrack();
    } else if (event.keyCode === 76) { // l
      $('#loop-track').click();
    }
  });
};

// will unbind keys on specific event handler
function unbindKeys(){
    console.log("hello i am in unbindKeys()");

  $(document).unbind('keyup');
  $(document).unbind('keydown');
}

function rebindKeys(){
  console.log("hello i am in rebindKeys()");

  $(document).bind('keyup', bindKeyUp);
  $(document).bind('keydown', bindKeyDown);
  bindKeyUp();
  bindKeyDown();
}
