const mapDiv = document.getElementById("map");
if (!mapDiv) return;

const coords = JSON.parse(mapDiv.dataset.coords);
const title = mapDiv.dataset.title || "";
const location = mapDiv.dataset.location || "";

if (!coords || coords.length < 2) {
  mapDiv.innerHTML = "<p>Map not available.</p>";
} else {
  const map = L.map("map").setView([coords[1], coords[0]], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  L.marker([coords[1], coords[0]])
    .addTo(map)
    .bindPopup(`<b>${title}</b><br>${location}`)
    .openPopup();
}
