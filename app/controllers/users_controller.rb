class UsersController < ApplicationController

  def show
    @tracks = current_user.tracks
  end

end
