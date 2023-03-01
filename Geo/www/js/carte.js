
// On vérifie que l'API soit disponible


var map = L.map("map").setView([16.2627584, -61.6628224], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

var popup = L.popup()
  .setLatLng([16.2627584, -61.6628224])
  .setContent(
    "<b>Hello world!</b><br>I am a popup. <Button>voir profil</Button>"
  )
  .openOn(map);

function onMapClick() {
  alert("slatt");
}

popup.on("click", onMapClick);
