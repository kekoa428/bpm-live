Rails.application.routes.draw do
  root to: 'rooms#show'
  mount ActionCable.server => '/cable'

  devise_for :users
  resources :users, only: [:show]

  resources :tracks, only: [:index, :new, :create, :show, :destroy] do
    resources :layers, only: [:index, :new, :create, :show, :destroy] do
      resources :beats, only: [:index, :new, :create, :show, :destroy]
    end
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
