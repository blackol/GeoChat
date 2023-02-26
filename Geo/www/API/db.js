const mysql = require("mysql");
const dbConfig = require("./config/db.config");

// Creation de la connexion avec labd
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

// Connexion a la base de donnee
connection.connect(error => {
    if (error) throw error;
    console.log("Connecter à la bd");
});

module.exports = connection;