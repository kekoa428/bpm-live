$(document).ready ->
  App.room = App.cable.subscriptions.create {
    channel: "RoomChannel"
    room_id: $('#main-grid').data('room-id')
    },
    collection: -> $("[data-channel='rooms']")

    connected: ->

    disconnected: ->
      # Called when the subscription has been terminated by the server

    received: (data) ->
      console.log(data)
      console.log("latency: #{Date.now() - data.beat.date}")
      data.beat.keyCode
      playKeypress(data.beat.keyCode, data.beat.color)

    speak: (beat) ->
      @perform 'speak', beat: beat, room_id: @collection().data('room-id')

$(document).on 'keydown', 'body', (event) ->
  keyCode = event.keyCode
  App.room.speak { keyCode: keyCode, date: Date.now()}

# $(document).on 'keypress', '[data-behavior~=room_speaker]', (event) ->
#   if event.keyCode is 13 # return/enter = sendpath
#     App.room.speak event.target.value
#     event.target.value = ''
#     event.preventDefault()
