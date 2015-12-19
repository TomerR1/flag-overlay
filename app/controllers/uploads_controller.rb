require 'rmagick'

class UploadsController < ApplicationController
    def new
        @upload = Upload.new
    end
    def create
        @upload = Upload.new(upload_params)
        @upload.key = SecureRandom.hex(5).to_s
        if @upload.save
            
            redirect_to upload_path(@upload)
        else
            redirect_to root_path
        end
    end
    def show
        @upload = Upload.find_by key: params[:id]
    end
    def overlay
        @upload = Upload.find_by key: params[:id]
        img = Magick::Image.read(@upload.image.path).first
        dimensions = Paperclip::Geometry.from_file(@upload.image.path)
        flag = Magick::Image.read('public/images/flags/fr.png').first
        flag.resize!(dimensions.width, dimensions.height)
        newImg = img.blend(flag, 0.5, 0.5, 0, 0)
        newImg.format = 'jpg'
        send_data(newImg.to_blob, :disposition => 'inline', :type => 'image/jpg')
    end
    private
        def upload_params
            params.require(:upload).permit(:image)
        end
end