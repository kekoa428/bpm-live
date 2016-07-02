function showColor(id, color) {
  $('#key-' + id.toString()).css('background-color', color);
}

// Random color generator
function randomColor() {
  return ('#' + Math.floor(Math.random()*16777215).toString(16));
}

// Color change functions
function boxChange(id) {
  $('#key-' + id).css('background-color', randomColor());
}

function boxChangeBack(id) {
  $('#key-' + id).css('background-color', 'black');
}

// Time out for each box?
function createTimeout(f,dynamicParameter,interval) {
  setTimeout(function() { f(dynamicParameter); }, interval);
}

function createTimeout(f, firstParam, secondParam, interval) {
  setTimeout(function() { f(firstParam, secondParam); }, interval);
}

// Snake through boxes with colors on page load (WIP)
function colorLoop() {
  var start_time = 0;
  for(var i = 18; i > 0; i--) {
    var id = (i % 9) || 9;
    createTimeout(boxChange, id, start_time += 150);
    createTimeout(boxChangeBack, id, start_time += 150);
  };
}
