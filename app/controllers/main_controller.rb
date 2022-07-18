class MainController < ApplicationController
  before_action :authenticate_user!
  layout "full"

  def index
  end
end