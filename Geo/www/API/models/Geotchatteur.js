const sql = require("./db.js");

// constructor
const Geotchatteur = function (geotchatteur) {
    this.nom = geotchatteur.nom;
    this.prenom = geotchatteur.prenom;
    this.sexe = geotchatteur.sexe;
    this.pseudo = geotchatteur.pseudo;
    this.mail = geotchatteur.mail;
    this.mdp = geotchatteur.mdp;
    this.dateNaissance = geotchatteur.dateNaissance;
    this.photo = geotchatteur.photo;
    this.dateDernierreCollecte = geotchatteur.dateDernierreCollecte;
    this.derniereLatitude = geotchatteur.derniereLatitude;
    this.derniereLongitude = geotchatteur.derniereLongitude;
};

Geotchatteur.create = (newGeotchatteur, result) => {
    sql.query("INSERT INTO geotchatteurs SET ?", newGeotchatteur, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created geotchatteur: ", { id: res.insertId, ...newGeotchatteur });
        result(null, { id: res.insertId, ...newGeotchatteur });
    });
};

Geotchatteur.findById = (id, result) => {
    sql.query(`SELECT * FROM geotchatteurs WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found geotchatteur: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Geotchatteur with the id
        result({ kind: "not_found" }, null);
    });
};

Geotchatteur.getAll = (nom, result) => {
    let query = "SELECT * FROM geotchatteurs";

    if (nom) {
        query += ` WHERE nom LIKE '%${nom}%'`;
    }

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("geotchatteurs: ", res);
        result(null, res);
    });
};

Geotchatteur.getAllPublished = result => { // Tout les user masculin
    sql.query("SELECT * FROM geotchatteurs WHERE sexe=M", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Geotchatteurs: ", res);
        result(null, res);
    });
};

Geotchatteur.updateById = (id, Geotchatteur, result) => {
    sql.query(
        "UPDATE geotchatteurs SET nom = ?, prenom = ?, sexe = ? WHERE id = ?",
        [Geotchatteur.nom, Geotchatteur.prenom, Geotchatteur.sexe, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Geotchatteur with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated geotchatteur: ", { id: id, ...Geotchatteur });
            result(null, { id: id, ...Geotchatteur });
        }
    );
};

Geotchatteur.remove = (id, result) => {
    sql.query("DELETE FROM geotchatteurs WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Geotchatteur with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted geotchatteur with id: ", id);
        result(null, res);
    });
};

Geotchatteur.removeAll = result => {
    sql.query("DELETE FROM geotchatteurs", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} Geotchatteurs`);
        result(null, res);
    });
};

module.exports = Geotchatteur;