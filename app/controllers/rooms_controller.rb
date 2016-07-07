class RoomsController < ApplicationController
  def new
    @room = Room.new
  end

  def show
    @room = Room.find(params[:id])
    render 'show'
  end

  def create
    @room = current_user.rooms.new
    if @room.save
      redirect_to "/rooms/#{@room.id}"
    else
      redirect_to "/users/sign_in"
    end
  end
end
