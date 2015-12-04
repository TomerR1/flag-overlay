class Upload < ActiveRecord::Base
    has_attached_file :image
    validates_attachment :image, content_type: { content_type: ["image/jpg", "image/jpeg", "image/png"] }
    validates :key, presence: true
    def to_param
        key
    end
end