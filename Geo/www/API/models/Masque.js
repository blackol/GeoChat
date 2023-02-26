const sql = require("../db.js");

// constructor
const Masque = function (masque) {
    this.idgeotchatteur = masque.idgeotchatteur;
    this.idmasque = masque.idmasque;
    this.datemasque = masque.datemasque;
    


};

Masque.create = (newMasque, result) => {
    sql.query("INSERT INTO masques SET ?", newMasque, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created masque: ", { id: res.insertId, ...newMasque });
        result(null, { id: res.insertId, ...newMasque });
    });
};

Masque.findById = (id, result) => {
    sql.query(`SELECT * FROM masques WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found masque: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Masque with the id
        result({ kind: "not_found" }, null);
    });
};

Masque.getAll = (nom, result) => {
    let query = "SELECT * FROM masques";

    if (nom) {
        query += ` WHERE nom LIKE '%${nom}%'`;
    }

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("masques: ", res);
        result(null, res);
    });
};





Masque.remove = (id, result) => {
    sql.query("DELETE FROM masques WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Masque with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted masque with id: ", id);
        result(null, res);
    });
};

Masque.removeAll = result => {
    sql.query("DELETE FROM masques", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} masques`);
        result(null, res);
    });
};

module.exports = Masque;