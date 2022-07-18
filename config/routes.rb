Rails.application.routes.draw do
  devise_for :users
  mount ActionCable.server => '/cable'

  namespace :admin do
    resources :users

    root to: "users#index"
  end

  resources :users, only: [:show, :update]

  root "main#index"
end
