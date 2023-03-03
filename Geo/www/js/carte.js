
// On vérifie que l'API soit disponible
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    //document.getElementById('btn').addEventListener("click", connect);
    getPosition();
}

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

function getPosition() {
  var options = {
    enableHighAccuracy:true,
    maximumAge: 3600000
  }

  var SuccessGeo = function(position) {
      var abc = L.marker([position.coords.latitude, position.coords.longitude]).addTo(map);

      var url = "http://geotchat.blackol-ca.com:8080/api/geotchatteurs/datedernierecollecte/"+localStorage.getItem('id');

      var formData = new FormData();

      formData.append('dateDernierreCollecte', new Date());

      var dataBis = Object.fromEntries(formData);

      var myInit = {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          body: JSON.stringify(dataBis),
        },
      };

      fetch(url, myInit)
      .then(function(response)
      {
        response.json().then(function(data){
          alert(data);
        })
      }).catch(function(response) {
        alert(response);
      });

      url = "http://geotchat.blackol-ca.com:8080/api/geotchatteurs/localisation/"+localStorage.getItem('id');

      formData = new FormData();

      formData.append('derniereLatitude', position.coords.latitude);
      formData.append('derniereLongitude', position.coords.longitude);

      dataBis = Object.fromEntries(formData);

      myInit = {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          body: JSON.stringify(dataBis),
        },
      }

      fetch(url, myInit)
      .then(function(response)
      {
        response.json().then(function(data){
          alert(data);
        })
      }).catch(function(response) {
        alert(response);
      });

      // move the map to have the location in its center
      window.map.panTo(new L.LatLng(position.coords.latitude, position.coords.longitude));
  }

  function onError(error) {
      alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
  }

  var watchID = navigator.geolocation.getCurrentPosition(SuccessGeo, onError, options);
}

popup.on("click", onMapClick);
