class BeatBroadcastJob < ApplicationJob
  queue_as :default

  def perform(beat)
    ActionCable.server.broadcast 'room_channel_#{beat.room.id}_channel', beat: render_beat(beat)
  end
  #
  # private
  #
  # def render_beat(beat)
  #   ApplicationController.renderer.render(partial: 'beats/beat', locals: { beat: beat })
  #   # ActionCable.server.broadcast "room_channel", message: data['message']
  # end
end
