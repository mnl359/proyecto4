class Route
  include Mongoid::Document
  embeds_many :points
  field :name, type: String
  embedded_in :user
end
