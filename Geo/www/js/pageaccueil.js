document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  // Cordova is now initialized. Have fun!
  //document.getElementById('connexion').addEventListener('click', connect, false);
  //document.getElementById('inscription').addEventListener('click', register, false);
}

function connect() {
  window.location.assign("../www/connexion.html");
}

function register() {
  window.location.assign("../www/inscription.html");
}
