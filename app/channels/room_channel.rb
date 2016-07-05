# Be sure to restart your server when you modify this file. Action Cable runs in a loop that does not support auto reloading.
class RoomChannel < ApplicationCable::Channel

  def subscribed
    # Check console to confirm room chagne is correct
    # When you do stream_from "room_channel_1, have broadcast_1, and room_id_1: channels are the same"
    stream_from "room_channel#{params[:id]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def speak(data)
    ActionCable.server.broadcast "room_channel#{params[:id]}", beat: data['beat']
    # Message.create! content: data['message']
  end
end
