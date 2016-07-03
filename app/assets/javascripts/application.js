//= require jquery2
//= require jquery_ujs
//= require jquery-ui/effect-shake

//= require 'colorFunctions'
//= require 'musicFunctions'

$(document).ready(function() {
  var div = ["7","8","9","4","5","6","1","2","3"];
  $("#key-7, #key-8, #key-9, #key-6, #key-3, #key-2, #key-1, #key-4, #key-5").hide().each(function(i) {
    $(this).delay(i*400).fadeIn(200);
    showColor(div[i], randomColor());
    // setTimeout($("#key-"+div[i]).css('background-color', 'black'), 1000);
  });

  // $("#key-7, #key-8, #key-9, #key-6, #key-3, #key-2, #key-1, #key-4, #key-5").hide().each(function(i) {
  //   $(this).css('background-color', 'black').delay(i*400)
  //   // setTimeout($("#key-"+div[i]).css('background-color', 'black'), 1000);
  // });

  // $("7, 8, #key-9, #key-6, #key-3, #key-2, #key-1, #key-4, #key-5").hide().each(function(i) {
  //   $("#key-"+this).delay(i*400).fadeIn(200);
  // });

  // Return square to black when key is depressed
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

  $('#play-track').click(function(event) {
    event.preventDefault();
    console.log(tracks);
    playTracks(tracks);
  })

  $('#stop-track').click(function(event) {
    event.preventDefault();
    // interval = 0;
  })


  // Records a track on click
  $('#record').click(function(event) {
    event.preventDefault();
    record();
  })

  // Removes last track recorded
  $('#undo').click(function(event) {
    event.preventDefault();
    undo();
  })

  // save
  $("#save").click(function(e) {
    console.log("Save clicked, prevent default")
    e.preventDefault();

    // send track back to DB (an array of layer objects).tracks is the recording

    $.ajax({
      url: '/tracks',
      data: {'track': tracks},
      method: 'post'
    })
  })

  // play track from user profile
  $(".play-track-from-user-profile").click(function(e) {
    console.log("Play clicked from user profile, prevent default")
    e.preventDefault();
    var play_button_clicked = $(this)
    console.log(play_button_clicked);

    var id_of_track_to_play = play_button_clicked.attr('id')
    console.log(play_button_clicked.attr('id'));

    // find contents of track to play, the array
    // var contents_of_track_to_play =


    // LASTLY:
    // playTracks( track.contents );
  })

  // Loops tracks
  $('#loop-track').click(function(event) {
    event.preventDefault();
    var self = $(this);
    self.unbind();

    playTracks(tracks);
    var myVar = setInterval(function() {
      playTracks(tracks);
    }, interval)

    $('#loop-track').bind('click', function(event){
      event.preventDefault();
      loopOff(myVar);
      $(this).unbind();
    })
  });

});

// colorLoop();
//   //openOverlay();
// });
//$('#main-overlay-close-btn').click(closeOverlay);
// /* Open when someone clicks on the span element */
// function openOverlay() {
//     document.getElementById("main-overlay").style.width = "100%";
// }
//
// /* Close when someone clicks on the "x" symbol inside the :overlay */
// function closeOverlay() {
//     document.getElementById("main-overlay").style.width = "0%";
// }
// function record_rest(start_time, end_time) {
//   if (start_time && end_time) {
//     track.push({ rest: (end_time - start_time) });
//   }
// }
//
// function record_keypress(key_code) {
//   track.push({ keypress: key_code });
// }
