class UsersController < ApplicationController

  def show
    @tracks = current_user.tracks

    puts @tracks[0]

  end

end
