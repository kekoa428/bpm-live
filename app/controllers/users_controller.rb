class UsersController < ApplicationController

  def show
    @tracks = current_user.tracks

    puts @tracks[0]
    # respond_to do |format|
    #   format.html # show.html.erb
    #   format.xml  { render :xml => @user }
    # end

  end

end
