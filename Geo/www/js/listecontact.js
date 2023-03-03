document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    //document.getElementById('btn').addEventListener("click", connect);
}

function loadInvit() {
    var myId = localStorage.getItem('id');
    var url = "http://geotchat.blackol-ca.com:8080/api/invitations/allofinvite?idinvite="+myId;

    fetch(url)
    .then(function(response)
    {
        response.json().then(function(data){
            data.forEach(element => {
                
                var url2 = "http://geotchat.blackol-ca.com:8080/api/geotchatteurs/"+element.idinviteur;
                fetch(url2, {
                    method: "GET"
                })
                .then(function(response2)
                {
                    response2.json().then(function(data2) {
                        data2.forEach(element2 => {
                            var div = document.createElement('div');
                            div.setAttribute('class', 'matchinvitation');
                            var img = document.createElement('img');
                            img.setAttribute('class', 'photogeotahteur-invit');
                            img.setAttribute('src', element2.photo);

                            document.querySelector('#listcontenaire-invit').appendChild(div);

                            var divInvit = document.createElement('div');
                            divInvit.setAttribute('class', "TexteInvit");
                            var span = document.createElement('span');
                            span.innerHTML = element2.pseudo;
                            divInvit.appendChild(span);
                            div.appendChild(img);
                            div.appendChild(divInvit);

                            var button = document.createElement('button');
                            button.innerHTML = "Voir le profil";
                            divInvit = document.createElement('div');
                            divInvit.setAttribute('class', "TexteInvit");
                            divInvit.appendChild(button);

                            divInvit = document.createElement('div');
                            divInvit.setAttribute('class', "TexteInvit");
                            button = document.createElement('button');
                            button.innerHTML = "Accepter";

                            divInvit.appendChild(button);
                            button.innerHTML = "Refuser";
                            divInvit.appendChild(button);
                            div.appendChild(divInvit);
                        });
                    });
                });
                
            });
        }).catch(function(response) {
            alert(response);
        });


        
    });
}

loadInvit();