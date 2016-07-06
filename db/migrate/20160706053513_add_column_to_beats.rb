class AddColumnToBeats < ActiveRecord::Migration[5.0]
  def change
    add_column :beats, :sound, :integer
  end
end
