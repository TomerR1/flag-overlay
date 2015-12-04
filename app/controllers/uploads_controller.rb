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
        @upload = Upload.find_by key: params[:key]
    end
    private
        def upload_params
            params.require(:upload).permit(:image)
        end
end