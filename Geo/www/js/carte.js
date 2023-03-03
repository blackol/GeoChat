
// On vérifie que l'API soit disponible
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    //document.getElementById('btn').addEventListener("click", connect);
    getPosition();
    getGeoTchatteurs();
}

var map = L.map("map").setView([16.2627584, -61.6628224], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

/*var popup = L.popup()
  .setLatLng([16.2627584, -61.6628224])
  .setContent(
    "<b>Hello world!</b><br>I am a popup. <Button>voir profil</Button>"
  )
  .openOn(map);

function onMapClick() {
  alert("slatt");
}*/

function getPosition() {
  var options = {
    enableHighAccuracy:true,
    maximumAge: 3600000
  }

  var SuccessGeo = function(position) {
      var abc = L.marker([position.coords.latitude, position.coords.longitude]).addTo(map);

      var url = "http://geotchat.blackol-ca.com:8080/api/geotchatteurs/datedernierecollecte/"+localStorage.getItem('id');

      var formData = new FormData();

      formData.append("dateDernierreCollecte", new Date().toLocaleDateString("en-CA"));

      var dataBis = Object.fromEntries(formData);

      var myInit = {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          
        },
        body: JSON.stringify(dataBis),
      };

      fetch(url, myInit)
      .then(function(response)
      {
        response.json().then(function(data){
          
        })
      }).catch(function(response) {
        alert(response);
      });

      url = "http://geotchat.blackol-ca.com:8080/api/geotchatteurs/localisation/"+localStorage.getItem('id');

      formData = new FormData();

      formData.append('derniereLatitude', parseFloat(position.coords.latitude));
      formData.append('derniereLongitude', parseFloat(position.coords.longitude));

      dataBis = Object.fromEntries(formData);

      myInit = {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json', 
        },
        body: JSON.stringify(dataBis),
      }

      fetch(url, myInit)
      .then(function(response)
      {
        response.json().then(function(data){
          
        })
      }).catch(function(response) {
        alert(response);
      });

      localStorage.setItem('latitude', position.coords.latitude);
      localStorage.setItem('longitude', position.coords.longitude);

      // move the map to have the location in its center
      window.map.panTo(new L.LatLng(position.coords.latitude, position.coords.longitude));
  }

  function onError(error) {
      alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
  }

  var watchID = navigator.geolocation.getCurrentPosition(SuccessGeo, onError, options);
}

function distance(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const distance = Math.sqrt(dx*dx + dy*dy);
  return distance;
}

function invite(id2) {
  var url = "http://geotchat.blackol-ca.com:8080/api/invitations/";

  const formData = new FormData();

  formData.append("idinviteur", localStorage.getItem('id'));
  formData.append("idinvite", parseInt(id2));
  formData.append("dateinvitation", new Date().toLocaleDateString('en-CA'));
  formData.append("idetat", 1);

  const dataBis = Object.fromEntries(formData);


  fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json', 
    },
    body: JSON.stringify(dataBis)
  })
  .then(function(response)
  {
    response.json().then(function(data){
      
    })
  })
  .catch(function(response) {
    alert("Error : "+ response);
  });
}

function getGeoTchatteurs() {
  var url = "http://geotchat.blackol-ca.com:8080/api/geotchatteurs/";

  fetch(url, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json', 
    },
  })
  .then(function(response)
  {
    response.json().then(function(data){
      var tabMarker = [];

      data.forEach(element => {
        if(element.derniereLatitude != null && element.id != localStorage.getItem('id')) {
          var dist = distance(localStorage.getItem('latitude'), element.derniereLongitude, localStorage.getItem('longitude'), element.derniereLatitude);
          if(dist < 200.00) {
            /* var popupI = new L.popup({
              autoClose: false
            })
            .setLatLng([element.derniereLatitude, element.derniereLongitude])
            .setContent(
              "<b>Hello world!</b><br>I am a popup. en bal en fes <Button>voir profil</Button>"
            )
            .addTo(map);
            alert('open like pince a linge');
            pop2.on("click", onMapClick); */

            let marker1= L.marker([element.derniereLatitude, element.derniereLongitude]).addTo(map);
            marker1.bindPopup("<img src='"+element.photo +"' width='120px' />  <br> <b>Hello je m'appelle " + element.pseudo + "!</b>  <br> <p>Je suis née le "+element.dateNaissance +" </p> <button onclick='invite("+ element.id +")'>Inviter</button>");
            tabMarker.push(marker1);


          }
        }
         
      });

      for (e in tabMarker){
        e.openPopup();
      }
    })
  })
  .catch(function(response) {
    alert("Erreur : "+ response);
  });
}

//popup.on("click", onMapClick);
