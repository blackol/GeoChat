document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    //document.getElementById('btn').addEventListener("click", connect);
}

function connect() {
    var url = "http://geotchat.blackol-ca.com:8080/api/geotchatteurs/connexion/login?pseudo="+document.querySelector("input[name='pseudo']").value+"&mdp="+document.querySelector("input[name='mdp']").value;

    /*$.get(url,function(response){
        alert("ça marche mafia");
        alert(response);
        console.log(response);
    });*/


    /*let xhr = new XMLHttpRequest();

    xhr.open("GET", url);
    alert("open");
    xhr.send();
    alert("send nude");

    xhr.onreadystatechange = function () {
        alert("onchange");
        if (xhr.readyState == 4) {
            if (xhr.status == 200 || xhr.status == 0) {
                var reponse = JSON.parse(xhr.responseText);
                console.log(reponse);
                alert("ca fonctionneeeee");
            }
        }
    };*/

    /*xhr.onload = function() {
        alert("onload bagay moun lan");
        if (xhr.status != 200) { // analyse l'état HTTP de la réponse
          alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
        } else { // show the result
          alert(`Done, got ${xhr.response.length} bytes`); // response est la réponse du serveur
        }
      };*/

    fetch(url)
    .then(function(response)
    {
        response.json().then(function(data) {
            console.log(data[0]);
            if (data[0]){
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