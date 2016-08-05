class TracksController < ApplicationController

  def index
    @tracks = Track.all
  end

  def new
    @track = Track.new
  end

  def create
    @track = Track.new(name: params[:name])

    @track.users << current_user
    track = params[:track].values

    track.each do |layer|
      new_layer = @track.layers.build
      layer.values.each {|beat| new_layer.beats.build(beat) }
    end

    respond_to do |format|
      if @track.save
        format.html  { redirect_to(root_path, notice: 'Post was successfully created.') }
        format.json  { render json: @track, status: :created, location: @track }
      else
        format.html  { render action: :new }
        format.json  { render json: @track.errors, status: :unprocessable_entity }
      end
    end
  end

  def show
    @track = Track.find(params[:id])

    render json: @track.to_json(include: { layers: { include: :beats } })
  end

  def destroy
    puts "#{params.inspect}*************************"
    @track = Track.find(params[:id])
    puts "#{@track.inspect}$$$$$$$$$$$$$$$$$$$$$$$$"
    @track.delete
    puts "#{@track.inspect}=================================="
    # render nothing: true, status: 200
    # if !request.xhr?
    #   respond_to do |format|
    #     format.html { redirect_to track_path }
    #     format.json { render json: @track }
    #     format.js   { render :layout => false }
    #   end
    # end
  end

private
  def track_params
    params.require(:track).permit(:name)
  end

end