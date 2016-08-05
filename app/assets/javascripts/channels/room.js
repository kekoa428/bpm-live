$(document).ready(function() {
  return App.room = App.cable.subscriptions.create({
    channel: "RoomChannel",
    room_id: $('#main-grid').data('room-id')
  }, {
    collection: function() {
      return $("[data-channel='rooms']");
    },
    connected: function() {},
    disconnected: function() {},
    received: function(data) {
      console.log("latency: " + (Date.now() - data.beat.date));
      data.beat.keyCode;
      return playKeypress(data.beat.keyCode, randomColor(), data.beat.soundswitch);
    },
    speak: function(beat) {
      return this.perform('speak', {
        beat: beat,
        room_id: this.collection().data('room-id')
      });
    }
  });
});

$(document).on('keydown', 'body', function(event) {
  var keyCode;
  keyCode = event.keyCode;
  soundswitch = soundSwitch();
  return App.room.speak({
    keyCode: keyCode,
    date: Date.now(),
    soundswitch: soundswitch
  });
});

