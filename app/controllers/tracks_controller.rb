class TracksController < ApplicationController


  def index

  end

  def new

  end

  def create
    # DONE - when click save, prevent default and send tracks object to here.

    # DONE - create new track. send track variable from application.js to controller using Json.

    # DONE - associate track with user


    @track = Track.new(track_params) # (params[:track])

    respond_to do |format|
      if @track.save
        format.html  { redirect_to(root_path,
                      :notice => 'Post was successfully created.') }
        format.json  { render :json => @track,
                      :status => :created, :location => @track }

        # associate track with user
        @track.users << current_user

        # loop through track and create new layer object for each item in array, with track_id - associate
        layers_hash = params[:track].values
        layer_arr = []
        layers_hash.each do |layer, bet|
          puts layer
          # gameplan:

          # loop through each layer and map values to an array ..

          # create layer objects

          # assocatiate layers to track
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

  private
  def track_params
    params.require(:track).permit(:name)
  end
end
