
function playSound(sound_file) {
  var audio = document.createElement("audio");
  audio.src = "/sounds/" + sound_file;
  audio.addEventListener("ended", function () {}, false);
  if (stop === false) {
    audio.play();
  }
}

function playKeypress(key_code, color, sound) {
  if (key_code < 49 || key_code > 58) { return; }
  var sound_file = soundFiles[sound][key_code - 49];
  playSound(sound_file);
  showColor(key_code - 48, color);
  currentSetTimeouts.push(createTimeoutThree(boxChangeBack, key_code - 48, 300));
}

function playLayer(layer) {
  var rest = 0;
  for (var i = 0; i < layer.length; i++) {
    var beat = layer[i];
    rest += beat.rest;
    currentSetTimeouts.push(createTimeoutFive(playKeypress, beat.keypress, beat.color, beat.sound, rest));
    console.log(currentSetTimeouts);
  }
}

function playTrack(track) {
  newInterval();
  if (looping === false) {
    $('#play-track').css('color', 'LimeGreen');
    setTimeout(function() {  $('#play-track').css('color', 'white'); }, interval);
  }
  else {
    loopingColor();
  }

  for (i = 0; i < track.length; i++) {
    playLayer(track[i]);
  }
}

function recordBeat(key_code, last_press_timestamp, this_press_timestamp, color, sound) {
  var beat = {
    rest: (this_press_timestamp - last_press_timestamp),
    keypress: key_code,
    color: color,
    sound: sound
  }
  layer.push(beat);
}

function record() {
  recording = !recording;
  if (recording) {
    $('#record').css('color', 'orange');
    last_press_timestamp = new Date().getTime();
    console.log('Started Recording');
  } else {
    $('#record').css('color', 'white');
    last_press_timestamp = null;
    console.log('Recording Stopped')
    if (layer.length > 0) {
      track.push(layer);
      layer = [];
    }
  }
}

function undo() {
  track.pop();
  $('#undo').css('color', 'cyan');
  setTimeout(function() { $('#undo').css('color', 'white'); }, 400)
  console.log('Removed the last layer')
}

function stopSwitch() {
  $('#stop-track').css('color', 'red');
  setTimeout(function() { $('#stop-track').css('color', 'white'); }, 400)
  looping = false;
  $('#loop-track').css('color', 'white');
  $('#play-track').css('color', 'white');
  if (recording) {
    $('#record').click();
  }
  clearInterval(trackLoop);
  for(var i = 0; i < currentSetTimeouts.length; i++ ) {
    clearTimeout(currentSetTimeouts[i]);
  }
  currentSetTimeouts = [];
}

function formatTrack(track) {
  var layerCount = track.layers.length;
  var formattedTrack = [];
  for (var i = 0; i < layerCount; i++) {
    beats = track.layers[i].beats;
    formattedTrack[i] = beats;
  }
  return formattedTrack;
}

function switchSounds() {
  differentSounds = !differentSounds;
  console.log('Switched the sounds');
  if (differentSounds) {
    sound = 1;
    $('#switch_sounds').text('Synth');
     $('#switch_sounds').css('color', 'HotPink');
    setTimeout(function() { $('#switch_sounds').css('color', 'white'); }, 500);
  }
  else {
    $('#switch_sounds').text('Drums');
     $('#switch_sounds').css('color', 'HotPink');
    setTimeout(function() { $('#switch_sounds').css('color', 'white'); }, 500);
  }
}

function soundSwitch() {
  if (differentSounds) {
    return 1;
   } else {
     return 0;
   }
};

function loopingColor() {
  if (looping) {
    $('#loop-track').css('color', 'yellow');
    $('#play-track').css('color', 'LimeGreen');
  }
  else {
    $('#loop-track').css('color', 'white');
    $('#play-track').css('color', 'white');
  }
}

function newInterval() {
  var arrayOfRests = findLayerRests(track);
  interval = findLongestLayer(arrayOfRests);
}

function layerRestLength(layer) {
  var rest = 0;
  for (var i = 0; i < layer.length; i++) {
    var beat = layer[i];
    rest += beat.rest;
  }
  return rest;
}

function findLayerRests(track) {
  var layerLengths = []
  track.forEach(function(layer) {
    layerLengths.push(layerRestLength(layer));
  });
  return layerLengths;
}

function findLongestLayer(array) {
  array.sort(function(a, b) { b - a; } )
  return array[0];
}
