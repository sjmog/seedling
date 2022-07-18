class ApiController < ApplicationController
  def index
    render json: { message: "Welcome to the API" }, status: 200
  end
end
