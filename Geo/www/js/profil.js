document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!
  
}

function loadInfos() {
    var myName = localStorage.getItem('nom');
    document.querySelector("#nom").innerHTML = myName;
    var myFirstname = localStorage.getItem('prenom');
    document.querySelector("#prenom").innerHTML = myFirstname;
    var myPseudo = localStorage.getItem('pseudo');
    document.querySelector("#pseudo").innerHTML = myPseudo;
    var myBirth = localStorage.getItem('birth');
    var annee = new Date(myBirth);

    document.querySelector("#age").innerHTML = (2023-parseInt(annee.getFullYear())).toString();
    var myPhoto = localStorage.getItem('photo');
    document.querySelector("#pp").setAttribute('src', myPhoto);
    var myMail = localStorage.getItem('mail');
    document.querySelector("#mail").innerHTML = myMail;
}

loadInfos();

function getBase64(file, onLoadCallback) {
    return new Promise(function(resolve, reject) {
        var reader = new FileReader();
        reader.onload = function() { resolve(reader.result); };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function submit() {
    var urlP = "http://geotchat.blackol-ca.com:8080/api/geotchatteurs/photo/"+localStorage.getItem('id');

    const formData  = new FormData();
    formData.append("photo", document.querySelector("input[name='photo']").value);

    const dataS = Object.fromEntries(formData);

    $.ajax({
        contentType: 'application/json',
        dataType: "json",
        data: JSON.stringify(dataS),
        success: function() {
            localStorage.setItem('photo',document.querySelector("input[name='photo']").value);
        },
        error: function(error) {
            console.log("Non mon reuf : "+error);
        },
        type: 'PUT',
        url: urlP
    });

    document.querySelector("#topbody2").removeChild(document.querySelector('input[name="photo"]'));
    document.querySelector("#topbody2").removeChild(document.querySelector('#btnEdit'));
}

function edit() {
    /*var input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('name', 'name');
    input.setAttribute('value', document.querySelector("#nom").textContent);
    input.setAttribute('size', 8);
    document.querySelector("#nom").textContent = "";*/

    //document.querySelector("#nom").appendChild(input);

    var input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', "Entrez l'url de votre image");
    input.setAttribute('name', "photo");

    document.querySelector("#topbody2").appendChild(input);
    document.querySelector("#topbody2").appendChild(document.createElement('br'));

    var btn = document.createElement('button');
    btn.setAttribute('onclick', 'submit()');
    btn.setAttribute('id', 'btnEdit');
    btn.textContent = "Valider";
    document.querySelector("#topbody2").appendChild(btn);
}