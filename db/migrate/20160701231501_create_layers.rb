class CreateLayers < ActiveRecord::Migration[5.0]
  def change
    create_table :layers do |t|
      t.integer :track_id, null: false

      t.timestamps
    end
  end
end
