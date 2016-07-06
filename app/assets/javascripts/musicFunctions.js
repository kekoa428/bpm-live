var track = [];
var layer = [];
var currentSetTimeouts = [];

var sounds = {
  // .wav files
  wav_files: ["Daft Punk - C4.wav", "Daft Punk - C5.wav", "Daft Punk - C6.wav", "RIF1(LD0.WAV", "RIF2(LD0.WAV",
  "RIF3(LD0.WAV", "OPEN-HIZ.WAV", "CUT-KIK(.WAV", "KICKASS(.WAV"],

  // .mp3 files
  mp3_files: [ "kick1.mp3", "kick2.mp3", "perc1.mp3", "snare4.mp3", "OPEN-HIZ.WAV",
  "OPEN-RAS.WAV", "vox2.mp3", "vox3.mp3", "vox4.mp3"]

}
var recording = false;
var looping = false;
var stop = false;
var differentSounds = false;
var soundFiles = [ sounds.mp3_files, sounds.wav_files ]

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
  currentSetTimeouts.push(createTimeout(boxChangeBack, key_code - 48, 300));
}

function playLayer(layer) {
  var rest = 0;
  for (var i = 0; i < layer.length; i++) {
    var beat = layer[i];
    rest += beat.rest;
    currentSetTimeouts.push(createTimeout(playKeypress, beat.keypress, beat.color, beat.sound, rest));
  }
}

function playTrack(track) {
  for (var i = 0; i < track.length; i++) {
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
    $('#record').css('color', 'red');
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
}

function stopSwitch() {
  looping = false;
  clearInterval(trackLoop);
  for(var i = 0; i < currentSetTimeouts.length; i++ ) {
    clearTimeout(currentSetTimeouts[i]);
  };
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
  if (differentSounds) { sound = 1; }
}

function soundSwitch() {
  if (differentSounds) {
    return 1;
   } else {
     return 0;
   }
};

//   if (differentSounds === false) {
//     soundFiles = sounds.wav_files;
//     console.log(soundFiles);
//   }
//   else {
//     soundFiles = sounds.mp3_files;
//     console.log(soundFiles);
//   }
// }
