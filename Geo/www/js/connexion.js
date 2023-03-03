document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    //document.getElementById('btn').addEventListener("click", connect);
}

function connect() {
    var url = "http://geotchat.blackol-ca.com:8080/api/geotchatteurs/connexion/login?pseudo="+document.querySelector("input[name='pseudo']").value+"&mdp="+document.querySelector("input[name='mdp']").value;

    fetch(url)
    .then(function(response)
    {
        response.json().then(function(data) {
            console.log(data[0]);
            if (data[0]){
                localStorage.setItem('id',data[0].id);
                localStorage.setItem('nom',data[0].nom);
                localStorage.setItem('prenom',data[0].prenom);
                localStorage.setItem('pseudo',data[0].pseudo);
                localStorage.setItem('birth',data[0].dateNaissance);
                localStorage.setItem('photo',data[0].photo);
                localStorage.setItem('mail',data[0].mail);
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
        alert("pwoblem : "+response);
    });
}