App.room = App.cable.subscriptions.create {
  channel: "RoomChannel"
  },
  connected: ->
    # Called when the subscription is ready for use on the server

  disconnected: ->
    # Called when the subscription has been terminated by the server

  received: (data) ->
    console.log(data)
    console.log("latency: #{Date.now() - data.message.date}")
    data.message.keyCode
    playKeypress(data.message.keyCode, data.message.color)
  # received: (data) ->
  #   $('#messages').append data['message']
    # Called when there's incoming data on the websocket for this channel

  speak: (message) ->
    @perform 'speak', message: message

$(document).on 'keydown', 'body', (event) ->
  keyCode = event.keyCode
  App.room.speak { keyCode: keyCode, rest: 300, color: '#ffffff', date: Date.now() }

# $(document).on 'keypress', '[data-behavior~=room_speaker]', (event) ->
#   if event.keyCode is 13 # return/enter = send
#     App.room.speak event.target.value
#     event.target.value = ''
#     event.preventDefault()
