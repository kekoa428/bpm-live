class Layer < ApplicationRecord
  belongs_to :track
  has_many :beats
end
