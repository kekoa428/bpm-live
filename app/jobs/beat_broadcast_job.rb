class BeatBroadcastJob < ApplicationJob
  queue_as :default

  def perform(beat)
    ActionCable.server.broadcast 'room_channel_#{beat.room.id}_channel', beat: render_beat(beat)
  end

end
