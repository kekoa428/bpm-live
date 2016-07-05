$('body').keyup(function(event) {
  var element_id = '#key-' + (event.keyCode - 48).toString();
  // add delay
  setTimeout(function(){
    $(element_id).css('background-color', 'black');
  }, 3000);
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
})
