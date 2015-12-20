class Upload < ActiveRecord::Base
    has_attached_file :image,
        :styles => {
      :thumb => "100x100",
      :resized  => "800x800>" }
    validates_attachment :image, content_type: { content_type: ["image/jpg", "image/jpeg", "image/png"] }
    validates :key, presence: true
    def to_param
        key
    end
end