var track = [];
var layer = [];
var trackLoop = [];

var currentSetTimeouts = [];

var sounds = {
  // .wav files
  second_kit: ["Daft Punk - C4.mp3", "Daft Punk - C5.mp3", "Daft Punk - C6.mp3", "RIF1(LD0.WAV", "RIF2(LD0.mp3",
  "RIF3(LD0.mp3", "OPEN-HIZ.mp3", "CUT-KIK(.mp3", "KICKASS(.mp3"],

  // .mp3 files
  first_kit: [ "kick1.mp3", "kick2.mp3", "perc1.mp3", "snare4.mp3", "OPEN-HIZ.mp3",
  "OPEN-RAS.mp3", "vox2.mp3", "vox3.mp3", "vox4.mp3"]

}
var recording = false;
var looping = false;
var stop = false;
var differentSounds = false;
var soundFiles = [ sounds.first_kit, sounds.second_kit ]

var this_press_timestamp = null;
var last_press_timestamp = null;

var interval = 0;

function playSound(sound_file) {
  var audio = document.createElement("audio");
  audio.src = "/sounds/" + sound_file;
  audio.addEventListener("ended", function () {}, false);
  if (stop === false) {
    audio.play();
  }
  // // FIXME: Should be a better way to pause this
  // // works more like MUTE than STOP
  // else if (stop === true) {
  //   audio.pause();
  //   // audio.currentTime = 0;
  //   throw "";
  // }
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
  }
}

function playTrack(track) {
  if (looping === false) {
    $('#play-track').css('color', 'green');
    setTimeout(function() {  $('#play-track').css('color', 'white'); }, interval)
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
  interval += beat.rest;
}

function record() {
  recording = !recording;
  if (recording) {
    $('#record').css('color', 'orange');
    last_press_timestamp = new Date().getTime();
    console.log('im recording');
  } else {
    $('#record').css('color', 'white');
    last_press_timestamp = null;
    console.log('i stopped recording')
    if (layer.length > 0) {
      track.push(layer);
      layer = [];
    }
  }
}

function playAndRecord(track) {
  playTrack(track);
  record();
}

function undo() {
  track.pop();
  $('#undo').css('color', 'blue');
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
     $('#switch_sounds').css('color', 'pink');
    setTimeout(function() { $('#switch_sounds').css('color', 'white'); }, 400)
  }
  else {
    $('#switch_sounds').text('Drums');
     $('#switch_sounds').css('color', 'pink');
    setTimeout(function() { $('#switch_sounds').css('color', 'white'); }, 400)
  }
}

function soundSwitch() {
  if (differentSounds) {
    return 1;
   } else {
     return 0;
   }
};
