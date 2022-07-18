class GenericChannel < ApplicationCable::Channel
  def subscribed
    stream_from "generic_channel"
  end
end