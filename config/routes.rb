Rails.application.routes.draw do
  root 'application#index'

  mount ActionCable.server => '/cable'

  devise_for :users
  resources :users, only: [:show]

  resources :rooms, only: [:new, :show, :create]

  resources :tracks, only: [:index, :new, :create, :show, :destroy] do
    resources :layers, only: [:index, :new, :create, :show, :destroy] do
      resources :beats, only: [:index, :new, :create, :show, :destroy]
    end
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
