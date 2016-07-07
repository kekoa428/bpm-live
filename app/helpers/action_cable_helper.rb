module ActionCableHelper
  def action_cable_meta_tag
    tag "meta", name: "action-cable-url", content: (
      ActionCable.server.config.url ||
      ActionCable.server.config.mount_path ||
      raise("No Action Cable URL configured -- please configure this at config.action_cable.url")
    )
  end
end
