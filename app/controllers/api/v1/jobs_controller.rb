# Query the status of jobs
class Api::V1::JobsController < ApplicationController
  before_action :authenticate_user!

  def status
    status = Sidekiq::Status::status(params[:job_id])

    render json: { status: status }, status: 200
  end
end