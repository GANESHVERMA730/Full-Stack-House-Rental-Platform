(function () {
  var mapDiv = document.getElementById("map");
  if (!mapDiv) return;

  var raw = mapDiv.dataset.coords;
  if (!raw) return;

  var coords;
  try {
    coords = JSON.parse(raw);
  } catch (e) {
    mapDiv.innerHTML = "<p class='text-muted'>Map data unavailable.</p>";
    return;
  }

  if (typeof L === "undefined") {
    mapDiv.innerHTML = "<p class='text-muted'>Map could not be loaded.</p>";
    return;
  }

  if (!coords || coords.length < 2 || isNaN(coords[0]) || isNaN(coords[1])) {
    mapDiv.innerHTML = "<p class='text-muted'>Map not available for this listing.</p>";
    return;
  }

  var map = L.map("map").setView([coords[1], coords[0]], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
  }).addTo(map);

  var customIcon = L.divIcon({
    html: '<div style="background:#ff385c;width:14px;height:14px;border-radius:50%;border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.4);"></div>',
    className: "",
    iconAnchor: [7, 7],
  });

  L.marker([coords[1], coords[0]], { icon: customIcon })
    .addTo(map)
    .bindPopup(
      "<b>" + mapDiv.dataset.title + "</b><br>" + mapDiv.dataset.location,
      { maxWidth: 200 }
    )
    .openPopup();

  setTimeout(function () {
    map.invalidateSize();
  }, 100);
})();
