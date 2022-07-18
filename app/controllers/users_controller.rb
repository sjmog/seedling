class UsersController < ApplicationController
  before_action :authenticate_user!

  def show
    @user = current_user
    render 'devise/registrations/edit'
  end

  def update
    @user = current_user

    updated_params = user_params.keys.select { |key| user_params[key].present? && @user[key] != user_params[key] }

    @user.update(user_params)

    if password_params && password_params.values.none? { |param| param.blank? }
      updated_params << "password"
    end

    if @user.errors.any?
      flash[:alert] = @user.errors.full_messages.join("\n")
      return render 'devise/registrations/edit'
    end

    notice = updated_params.length > 0 ? "Your #{ updated_params.to_sentence } #{ updated_params.length > 1 ? 'were' : 'was' } updated successfully."
                                       : "No changes were made."

    redirect_to root_path, notice: notice
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end

  def password_params
    params.require(:user).permit(:password, :password_confirmation)
  end
end