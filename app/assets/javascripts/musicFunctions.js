var tracks = [];
var layer = [];
// .wav files
var wav_files = ["kick1.wav", "kick2.wav", "perc1.wav", "snare4.wav", "trophies.wav",
  "vox1.wav", "vox2.wav", "vox3.wav", "vox4.wav"];
// .mp3 files
var mp3_files = ["kick1.mp3", "kick2.mp3", "perc1.mp3", "snare4.mp3", "trophies.mp3",
  "vox1.mp3", "vox2.mp3", "vox3.mp3", "vox4.mp3"];


var recording = false;
var looping = false;
var stop = false;
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
  // FIXME: Should be a better way to pause this
  else if (stop === true) {
    audio.pause();
    // audio.currentTime = 0;
    throw "";
  }
}


function playKeypress(key_code, color) {
  if (key_code < 49 || key_code > 58) { return; }
  var sound_file = mp3_files[key_code - 49];
  playSound(sound_file);
  showColor(key_code - 48, color);
  createTimeout(boxChangeBack, key_code - 48, 1000000);
}

function playLayer(layer) {
  var rest = 0;
  for (var i = 0; i < layer.length; i++) {
    var beat = layer[i];
    console.log(beat);
    rest += beat.rest;
    createTimeout(playKeypress
      , beat.keypress, beat.color, rest);
  }
}

function playTracks(tracks) {
  for (var i = 0; i < tracks.length; i++) {
    playLayer(tracks[i]);
  }
}

function recordBeat(key_code, last_press_timestamp, this_press_timestamp, color) {
  var beat = {
    rest: (this_press_timestamp - last_press_timestamp),
    keypress: key_code,
    color: color
  };
  layer.push(beat);
  interval += beat.rest
}

function record() {
  recording = !recording;
  if (recording) {
    $('#record').css('color', 'red');
    last_press_timestamp = new Date().getTime();
    console.log('im recording');
  } else {
    $('#record').css('color', 'white');
    last_press_timestamp = null;
    console.log('i stopped recording')
    if (layer.length > 0) {
      tracks.push(layer);
      layer = [];
    }
  }
}

function playAndRecord(tracks) {
  playTracks(tracks);
  record();
}

function undo() {
  tracks.pop();
}

function loopOff(interval) {
  clearInterval(interval);
}

function stopSwitch() {
  stop = !stop;
}
