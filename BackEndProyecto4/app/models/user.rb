class User
  include Mongoid::Document
  include ActiveModel::SecurePassword
  embeds_many :routes

  field :name, type: String
  field :email, type: String
  field :password_digest, type: String
  

  index({ name: 1 }, { unique: true, name: "name_index" })
  index({ email: 1 }, { unique: true, name: "email_index" })

  has_secure_password
end
