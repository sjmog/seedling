require 'digest/md5'

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates_presence_of :email

  def admin?
    admin
  end

  def email_hash
    Digest::MD5.hexdigest(email.strip.downcase)
  end

  def gravatar
    "https://gravatar.com/avatar/#{email_hash}"
  end

  def display_as_json
    {
      id: id,
      email: email,
      name: name,
      avatar: gravatar,
      isAdmin: admin?
    }
  end
end
