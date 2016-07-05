class ChangeRestAndKeyPressDatatypesInBeats < ActiveRecord::Migration[5.0]
  def change
    change_column :beats, :rest,
      "integer USING NULLIF(rest, '')::int"
    change_column :beats, :keypress,
      "integer USING NULLIF(keypress, '')::int"
  end
end
