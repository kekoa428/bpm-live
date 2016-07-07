class Beat < ApplicationRecord
  belongs_to :layer
  #after_create_commit { BeatBroadcastJob.perform_later self }
end
