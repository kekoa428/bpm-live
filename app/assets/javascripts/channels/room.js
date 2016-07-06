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
      console.log(data);
      console.log("latency: " + (Date.now() - data.beat.date));
      data.beat.keyCode;
      return playKeypress(data.beat.keyCode, randomColor());
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
  return App.room.speak({
    keyCode: keyCode,
    date: Date.now()
  });
});

// # $(document).on('keypress', '[data-behavior~=room_speaker]', function(event) {
// #   if (event.keyCode === 13) {
// #     App.room.speak(event.target.value);
// #     event.target.value = '';
// #     return event.preventDefault();
// #   }
// # });
// #
