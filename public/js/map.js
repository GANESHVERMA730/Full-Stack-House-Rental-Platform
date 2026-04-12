const mapDiv = document.getElementById("map");

// get data from HTML
const listing = JSON.parse(mapDiv.dataset.listing);

const coords = listing.geometry.coordinates;

// create map
const map = L.map("map").setView([coords[1], coords[0]], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
}).addTo(map);

L.marker([coords[1], coords[0]])
  .addTo(map)
  .bindPopup(listing.location)
  .openPopup();