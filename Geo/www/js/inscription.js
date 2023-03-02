document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    document.getElementById('pic').addEventListener('click', loadPic, false);    
}

function loadPic() {
    navigator.camera.getPicture(onSuccess, onFail, {quality: 25, destinationType: Camera.DestinationType.DATA_URL, sourceType:0});
}

function onSuccess(imageData) {
    var image = "data:image/png;base64," +imageData;
    document.querySelector('input[name="photo"]').setAttribute('value', image);
}

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/?[A-z]*;base64,/);
}

function submit() {
    var url = "http://geotchat.blackol-ca.com:8080/api/geotchatteurs/pseudo/"+document.querySelector("input[name='pseudo']").value;

    fetch(url)
    .then(function(response)
    {
        response.json().then(function(data) {
            if(data.id) {
                alert('Pseudo déjà utilisé');
            }
            else {
                var url = "http://geotchat.blackol-ca.com:8080/api/geotchatteurs";
                const formData  = new FormData();
                formData.append("nom", document.querySelector("input[name='name']").value);
                formData.append("prenom", document.querySelector("input[name='firstname']").value);
                formData.append("sexe", document.querySelector("input[name='sexe']").value);
                formData.append("pseudo", document.querySelector("input[name='pseudo']").value);
                formData.append("mail", document.querySelector("input[name='mail']").value);
                formData.append("mdp", document.querySelector("input[name='mdp']").value);
                formData.append("dateNaissance", document.querySelector("input[name='birth']").value);

                if(document.querySelector('input[name="photo"]').value == ""){
                    if(document.querySelector("input[name='sexe']").value == "M"){
                        var img64 = getBase64Image("homme.png");
                        
                    }
                    else {
                        var img64 = getBase64Image("femme.png");
                    }
                    document.querySelector('input[name="photo"]').setAttribute("value", img64);
                }
                
                formData.append("photo", document.querySelector('input[name="photo"]').value);

                const data = Object.fromEntries(formData);

                var myInit = { method: 'POST',
                        headers: {
                                'Content-type': 'application/json'
                        },
                        body: JSON.stringify(data),
                            };
                
                console.log(myInit);
                fetch(url, myInit)
                .then(function(response)
                {
                    response.json().then(function(data) {
                        console.log(data);
                        if(data.id) {
                            alert("Inscription réussie");
                            window.location.assign("pageaccueil.html");
                        }
                        else {
                            alert("Une erreur est survenue lors de votre inscription.\nVérifiez que tous les champs sont bien remplis");
                        }
                    });
                })
                .catch(function(response)
                {
                    console.log("pwoblem");
                });
            }
        });
    })
}