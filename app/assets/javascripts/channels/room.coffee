App.room = App.cable.subscriptions.create "RoomChannel",
  connected: ->
    # Called when the subscription is ready for use on the server

  disconnected: ->
    # Called when the subscription has been terminated by the server

  received: (data) ->
    console.log(data)
    console.log("latency: #{Date.now() - data.beat.date}")
    data.beat.keyCode
    playKeypress(data.beat.keyCode, data.beat.color)
  # received: (data) ->
  #   $('#messages').append data['message']
    # Called when there's incoming data on the websocket for this channel

  speak: (beat) ->
    @perform 'speak', beat: beat

$(document).on 'keydown', 'body', (event) ->
  keyCode = event.keyCode
  App.room.speak { keyCode: keyCode, rest: 300, color: '#ffffff', date: Date.now() }

# $(document).on 'keypress', '[data-behavior~=room_speaker]', (event) ->
#   if event.keyCode is 13 # return/enter = send
#     App.room.speak event.target.value
#     event.target.value = ''
#     event.preventDefault()
