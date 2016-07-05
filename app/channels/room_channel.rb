# Be sure to restart your server when you modify this file. Action Cable runs in a loop that does not support auto reloading.
class RoomChannel < ApplicationCable::Channel

  def subscribed
    # Check console to confirm room change is correct
    # When you do stream_from "room_channel_1, have broadcast_1, and room_id_1: channels are the same"
    # binding.pry
    # byebug
    @room = Room.find_by(id: params[:room_id])
    stream_from "room_channel_#{@room.try(:id)}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def speak(data)
    #need to update broadcast with params
    ActionCable.server.broadcast "room_channel_#{data['room_id'].to_i}", beat: data['beat']
    # Message.create! content: data['message']
  end
end
