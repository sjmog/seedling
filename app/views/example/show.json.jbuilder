json.(@dashboard, :id)

json.charts do
  json.array! @dashboard.charts do |chart|
    json.(chart, :id, :description, :subtitle, :type, :url, :specification, :width, :height)
    json.title chart.title.titleize
  end
end
