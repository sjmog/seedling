require 'sidekiq'
require 'sidekiq-status'

Sidekiq.configure_server do |config|
  config.redis = { url: ENV['REDIS_URL'], network_timeout: 5, ssl_params: { verify_mode: OpenSSL::SSL::VERIFY_NONE } }
  Sidekiq::Status.configure_server_middleware config, expiration: 30.minutes
  Sidekiq::Status.configure_client_middleware config, expiration: 30.minutes
end

Sidekiq.configure_client do |config|
  config.redis = { url: ENV['REDIS_URL'], network_timeout: 5, ssl_params: { verify_mode: OpenSSL::SSL::VERIFY_NONE } }
  Sidekiq::Status.configure_client_middleware config, expiration: 30.minutes
end
