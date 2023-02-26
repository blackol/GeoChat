const sql = require("./db.js");

// constructor
const Message = function (message) {
    this.idmessage = message.idmessage;
    this.datemessage = message.datemessage;
    this.message = message.message;
    this.idenvoyeur = message.idenvoyeur;
    this.idrecepteur = message.idrecepteur;


};

Message.create = (newMessage, result) => {
    sql.query("INSERT INTO messages SET ?", newMessage, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created Message: ", { id: res.insertId, ...newMessage });
        result(null, { id: res.insertId, ...newMessage });
    });
};

Message.findById = (id, result) => {
    sql.query(`SELECT * FROM messages WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found Message: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Message with the id
        result({ kind: "not_found" }, null);
    });
};

Message.getAll = (nom, result) => {
    let query = "SELECT * FROM messages";

    if (nom) {
        query += ` WHERE nom LIKE '%${nom}%'`;
    }

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Messages: ", res);
        result(null, res);
    });
};


Message.updateById = (id, message, result) => {
    sql.query(
        "UPDATE messages SET datemessage = ?, message = ?",
        [message.datemessage, message.message, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found message with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated message: ", { id: id, ...message });
            result(null, { id: id, ...message });
        }
    );
};


Message.remove = (id, result) => {
    sql.query("DELETE FROM messages WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Message with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted message with id: ", id);
        result(null, res);
    });
};

Message.removeAll = result => {
    sql.query("DELETE FROM messages", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} Messages`);
        result(null, res);
    });
};

module.exports = Message;