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

function submit() {
    var url = "http://212.227.202.166:8080/api/geotchatteurs";

    const formData  = new FormData();
    formData.append("nom", document.querySelector("input[name='name']").value);
    formData.append("prenom", document.querySelector("input[name='firstname']").value);
    formData.append("sexe", document.querySelector("input[name='sexe']").value);
    formData.append("pseudo", document.querySelector("input[name='pseudo']").value);
    formData.append("mail", document.querySelector("input[name='mail']").value);
    formData.append("mdp", document.querySelector("input[name='mdp']").value);
    formData.append("dateNaissance", document.querySelector("input[name='birth']").value);
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
                window.location.assign("Description.html");
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