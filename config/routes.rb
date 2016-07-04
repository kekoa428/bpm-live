Rails.application.routes.draw do
  root to: 'rooms#show'
  mount ActionCable.server => '/cable'
  devise_for :users
  resources :tracks
  resources :users, only: [:show]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
