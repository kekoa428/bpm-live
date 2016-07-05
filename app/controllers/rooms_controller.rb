class RoomsController < ApplicationController
  def new
    @room = Room.new
  end

  def show
    @room = Room.find(params[:id])
    render 'show'
  end

  def create
    @room = current_user.rooms.new(path: Room.generate_url)
    if @room.save
      flash[:success] = 'Beat room added!'
      redirect_to rooms_path
    else
      render 'new'
    end
  end
end
