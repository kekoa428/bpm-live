function showColor(id, color) {
  var square = $('#key-'+ id.toString());
  var square_limit = square;

  // var x_coord = square_offset.left;
  var x_coord = square.width()/3;
  // var y_coord = square_offset.top;
  var y_coord = square.height()/3;

  // this will create the ripple wrap
  // Draw the ripple effect wrap
  var ripple_effect_wrap = $('<span class="ripple-effect-wrap"></span>');
  ripple_effect_wrap.css({
    'width' 		: square.width(),
    'height'		: square.height(),
    'position' 		: 'relative',
    'top'			: y_coord/2,
    'left'	 		: x_coord/2,
    'z-index' 		: 0,
    'overflow' 		: 'hidden',
    'background-clip': 'padding-box'
  });

  ripple_effect_wrap.appendTo(square);

  var circular_width = 500;

  // Draw the ripple effect
  var ripple = $('<span class="ripple"></span>');
  ripple.css({
  	'width' 			: circular_width,
  	'height'			: circular_width,
  	'background'			: color, //'rgba(0,0,0,0.3)',
  	'position'			: 'absolute',
  	'top'				: y_coord - ( circular_width / 2 ),
  	'left'				: x_coord - ( circular_width / 2 ),
  	'content'			: '',
  	'background-clip' 		: 'padding-box',
  	'-webkit-border-radius'     	: '50%',
  	'border-radius'             	: '50%',
  	'-webkit-animation-name'	: 'ripple-animation',
  	'animation-name'              	: 'ripple-animation',
  	'-webkit-animation-duration'  	: '2s',
  	'animation-duration'          	: '2s',
  	'-webkit-animation-fill-mode' 	: 'both',
  	'animation-fill-mode'         	: 'both'
  });
  $('.ripple-effect-wrap:last').append( ripple );

  // Remove rippling component after half second
  setTimeout( function(){
  	ripple_effect_wrap.fadeOut(function(){
  		$(this).remove();
  	});
  }, 100 );

  $('#key-' + id.toString()).effect('shake', { direction: "left", distance: 5, times: 5 } ).css('background-color', color);
}

// var colors = [
//   "#1abc9c", "#f39c12", "#16a085", "#f1c40f",
//   "#2ecc71", "#27ae60", "#e67e22", "#d35400",
//   "#3498db", "#2980b9", "#e74c3c", "#c0392b",
//   "#9b59b6", "#8e44ad", "#ecf0f1", "#bdc3c7"
// ];

// Random color generator
function randomColor() {
  return ('#' + Math.floor(Math.random()*16777215).toString(16));
  // return colors[Math.floor(Math.random() * colors.length)];
}

// Color change functions
function boxChange(id) {
  $('#key-' + id).css('background-color', randomColor());
}

function boxChangeBack(id) {
  $('#key-' + id).css('background-color', 'black');
}

function fadeToBlack(id) {
  var css_selector = '#key-' + id;
  $(css_selector).animate({ backgroundColor: 'black' }, 300);
}

function fadeToColor(id, color) {
  var css_selector = '#key-' + id;
  //fadeInBorder(id);
  $(css_selector).css({ visibility: 'visible', opacity: 0.0 }).animate({ backgroundColor: color, opacity: 1.0 }, 300);
}

function fadeInBorder(id) {
  var css_selector = '#key-' + id;
  //$(css_selector).fadeIn('slow');
  $(css_selector).css({ visibility: 'visible', opacity: 0.0 }).animate({ opacity: 1.0 }, 6000);
}


// Time out for each box?
function createTimeoutThree(f, dynamicParameter, interval) {
  var timer;
  timer = setTimeout(function() { f(dynamicParameter); }, interval);
  return timer;
}

function createTimeoutFour(f, firstParam, secondParam, thirdParam, interval) {
  var timer;
  timer = setTimeout(function() { f(firstParam, secondParam, thirdParam); }, interval);
  return timer;
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
