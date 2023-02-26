const sql = require("./db.js");

// constructor
const Etat = function (etat) {
    this.id = etat.id;
    this.libelle = etat.libelle;
    
};

Etat.create = (newEtat, result) => {
    sql.query("INSERT INTO etats SET ?", newEtat, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created etat: ", { id: res.insertId, ...newEtat });
        result(null, { id: res.insertId, ...newEtat });
    });
};

Etat.findById = (id, result) => {
    sql.query(`SELECT * FROM etats WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found Etat: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Etat with the id
        result({ kind: "not_found" }, null);
    });
};

Etat.getAll = (nom, result) => {
    let query = "SELECT * FROM etats";

    if (nom) {
        query += ` WHERE nom LIKE '%${nom}%'`;
    }

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Etats: ", res);
        result(null, res);
    });
};


Etat.updateById = (id, etat, result) => {
    sql.query(
        "UPDATE etats SET libelle = ?",
        [etat.libelle, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found etat with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated etat: ", { id: id, ...etat });
            result(null, { id: id, ...etat });
        }
    );
};

Etat.remove = (id, result) => {
    sql.query("DELETE FROM etats WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Etat with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted Etat with id: ", id);
        result(null, res);
    });
};

Etat.removeAll = result => {
    sql.query("DELETE FROM etats", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} Etats`);
        result(null, res);
    });
};

module.exports = Etat;