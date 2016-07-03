class TracksController < ApplicationController

  def index
    @tracks = Track.all
  end

  def new

  end

  def create
    # DONE - when click save, prevent default and send tracks object to here.

    # DONE - create new track. send track variable from application.js to controller using Json.

    # DONE - associate track with user


    # loop through track and create new layer object for each item in array, with track_id - associate

    @track = Track.new(track_params) # (params[:track])
    respond_to do |format|
      if @track.save
        format.html  { redirect_to(root_path,
                      :notice => 'Track successfully added.') }
        format.json  { render :json => @track,
                      :status => :created, :location => @track }
        # associate track with user
        @track.users << current_user

        end

        # params[:track].values creates array of layers

      else
        format.html  { render :action => "new" }
        format.json  { render :json => @track.errors,
                      :status => :unprocessable_entity }
      end
    end

  end

  def destroy

  end

  def edit

  end

  def update

  end

  private
  def track_params
    params.require(:track).permit(:name)
  end
end
