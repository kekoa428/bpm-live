function bindKeyUp() {
  $(document).keyup(function(event) {
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
      recordBeat(key_code, last_press_timestamp, this_press_timestamp, color);
      last_press_timestamp = this_press_timestamp;
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
