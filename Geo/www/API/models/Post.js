/*
Un modele de fichier de donner defini les attributs de la classes

 Ici on a cree un modele de fichier de donnée dans le dossier models pour pouvoir definir le fichier de donnée d' un Post

*/

const mongoose = require('mongoose'); //importer le paquet de mongoose

const postSchema = mongoose.Schema ({
    title:{
        type: String,
        require: true,
    },
    description:{
        type: String,
        require: true
    },
    date:{
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Posts', postSchema);