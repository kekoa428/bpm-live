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

    if (recording) {
      this_press_timestamp = new Date().getTime();
      recordBeat(key_code, last_press_timestamp, this_press_timestamp, color, soundSwitch());
      last_press_timestamp = this_press_timestamp;
    }
  });

  $(document).keydown(function(event) {
    if (event.keyCode == 82) {        // r = record
      $('#record').click();
    } else if (event.keyCode === 80) { // p - play
      $('#play-track').click();
    } else if (event.keyCode === 88) { // x - stop
      stopSwitch();
    } else if (event.keyCode === 85) { // u - undo
      undo();
    } else if (event.keyCode === 83) { // s - switch
      switchSounds();
    } else if (event.keyCode === 76) { // l - loop
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

function bindClickEvents(){
  var color = randomColor();

  $("#key-1").on('click',function(e){
    e.preventDefault();
    var key_code = 49;

    playKeypress(key_code, color, soundSwitch());
  });
  $("#key-2").on('click',function(e){
    e.preventDefault();
    var key_code = 50;

    playKeypress(key_code, color, soundSwitch());
  });
  $("#key-3").on('click',function(e){
    e.preventDefault();
    var key_code = 51;

    playKeypress(key_code, color, soundSwitch());
  });
  $("#key-4").on('click',function(e){
    e.preventDefault();
    var key_code = 52;

    playKeypress(key_code, color, soundSwitch());
  });
  $("#key-5").on('click',function(e){
    e.preventDefault();
    var key_code = 53;

    playKeypress(key_code, color, soundSwitch());
  });
  $("#key-6").on('click',function(e){
    e.preventDefault();
    var key_code = 54;

    playKeypress(key_code, color, soundSwitch());
  });
  $("#key-7").on('click',function(e){
    e.preventDefault();
    var key_code = 55;

    playKeypress(key_code, color, soundSwitch());
  });
  $("#key-8").on('click',function(e){
    e.preventDefault();
    var key_code = 56;

    playKeypress(key_code, color, soundSwitch());
  });
  $("#key-9").on('click',function(e){
    e.preventDefault();
    console.log("key-7");
    var key_code = 57;

    playKeypress(key_code, color, soundSwitch());
  });
}
