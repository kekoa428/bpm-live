$(document).ready ->
  App.room = App.cable.subscriptions.create {
    channel: "RoomChannel"
    room_id: $('#main-grid').data('room-id')
    # Check Websocket Frames to confirm identifier is being called.
    },
    collection: -> $("[data-channel='rooms']")

    connected: ->
      setTimeout =>
        @subscribeToRoom()
        @installPageChangeCallback()
        1000

    disconnected: ->
      # Called when the subscription has been terminated by the server

    received: (data) ->
      console.log(data)
      console.log("latency: #{Date.now() - data.beat.date}")
      data.beat.keyCode
      playKeypress(data.beat.keyCode, data.beat.color)
    # received: (data) ->
    #   $('#messages').append data['beat']
      # Called when there's incoming data on the websocket for this channel

    speak: (beat) ->
      @perform 'speak', beat: beat, room_id: @collection().data('room-id')

    subscribeToRoom: ->
      if roomId = @collection().data('room-id')
        @perform 'subscribed', room_id: roomId
      else
        @perform 'unsubscribed'

    installPageChangeCallback: ->
      unless @installedPageChangeCallback
        @installedPageChangeCallback = true
        $(document).on 'page:change', -> App.room.subscribeToRoom()

$(document).on 'keydown', 'body', (event) ->
  keyCode = event.keyCode
  App.room.speak { keyCode: keyCode, date: Date.now()}

# $(document).on 'keypress', '[data-behavior~=room_speaker]', (event) ->
#   if event.keyCode is 13 # return/enter = send
#     App.room.speak event.target.value
#     event.target.value = ''
#     event.preventDefault()
