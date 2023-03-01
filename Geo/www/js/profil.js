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
    var image = new Image();
    image.src = myPhoto;
    document.querySelector("#topbody2").appendChild(image);
    var myMail = localStorage.getItem('mail');
    document.querySelector("#mail").innerHTML = myMail;
}

loadInfos();

