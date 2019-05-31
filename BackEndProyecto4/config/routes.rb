Rails.application.routes.draw do
  resources :points
  resources :routes
  resources :users
  post 'authenticate', to: 'authentication#authenticate'
end
