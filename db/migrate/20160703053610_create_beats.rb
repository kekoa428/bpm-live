class CreateBeats < ActiveRecord::Migration[5.0]
  def change
    create_table :beats do |t|
      t.integer :layer_id, null: false
      t.string :rest
      t.string :keypress
      t.string :color

      t.timestamps(null: false)
    end
  end
end
