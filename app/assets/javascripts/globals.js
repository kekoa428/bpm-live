// Track Builder Globals
var track = [];
var layer = [];
var trackLoop = [];

var currentSetTimeouts = [];

var recording = false;
var looping = false;
var stop = false;
var differentSounds = false;

var this_press_timestamp = null;
var last_press_timestamp = null;

var interval = 0;

var sounds = {
  first_kit: [ "kick1.mp3", "kick2.mp3", "perc1.mp3", "snare4.mp3", "trophies.mp3",
  "OPEN-RAS.mp3", "vox2.mp3", "vox3.mp3", "vox4.mp3"],
  second_kit: ["ClickClackPOWPOW!.mp3", "OneHunnid.mp3", "J.E.T.Lag (1).mp3", "RIF1(LD0.WAV", "RIF2(LD0.mp3",
  "RIF3(LD0.mp3", "OPEN-HIZ.mp3", "CUT-KIK(.mp3", "KICKASS(.mp3"],
}

var soundFiles = [ sounds.first_kit, sounds.second_kit ]
