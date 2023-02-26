const sql = require("./db.js");

// constructor
const Invitation = function (invitation) {
    this.idinviteur = invitation.idinviteur;
    this.idinvite = invitation.idinvite;
    this.dateinvitation = invitation.dateinvitation;
    this.idetat = invitation.idetat;
    
    
};

Invitation.create = (newInvitation, result) => {
    sql.query("INSERT INTO invitations SET ?", newInvitation, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created invitation: ", { id: res.insertId, ...newInvitation });
        result(null, { id: res.insertId, ...newInvitation });
    });
};

Invitation.findById = (id, result) => {
    sql.query(`SELECT * FROM invitations WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found invitation: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Invitation with the id
        result({ kind: "not_found" }, null);
    });
};

Invitation.getAll = (nom, result) => {
    let query = "SELECT * FROM invitations";

    if (nom) {
        query += ` WHERE nom LIKE '%${nom}%'`;
    }

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("invitations: ", res);
        result(null, res);
    });
};





Invitation.remove = (id, result) => {
    sql.query("DELETE FROM invitations WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Invitation with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted invitation with id: ", id);
        result(null, res);
    });
};

Invitation.removeAll = result => {
    sql.query("DELETE FROM invitations", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} Invitations`);
        result(null, res);
    });
};

module.exports = Invitation;