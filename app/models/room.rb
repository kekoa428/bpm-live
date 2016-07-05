class Room < ApplicationRecord
  has_many :users_rooms
  has_many :users, through: :user_rooms

  def self.generate_path
    (0...6).map { ('a'..'z').to_a[rand(26)] }.join
  end
end
