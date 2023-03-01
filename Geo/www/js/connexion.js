document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!
  
}

function connect() {
    var url = "http://212.227.202.166:8080/api/geotchatteurs/connexion/login?pseudo="+document.querySelector("input[name='pseudo']").value+"&mdp="+document.querySelector("input[name='mdp']").value;

    fetch(url)
    .then(function(response)
    {
        response.json().then(function(data) {
            console.log(data);
            if (data[0]){
                window.location.assign("Carte.html");
            }
            else {
                alert("Connexion échoué");
            }
        });
    })
    .catch(function(response)
    {
        console.log("pwoblem");
    });
}