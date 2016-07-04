class CreateRooms < ActiveRecord::Migration[5.0]
  def change
    create_table :rooms
      t.string   :path
    end
  end
end
