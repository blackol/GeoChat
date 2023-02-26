module.exports = app => {
    const masques = require("../controllers/masque.controller.js");

    var router = require("express").Router();

    // Create a new masques
    router.post("/", masques.create);

    // Retrieve all masques
    router.get("/", masques.findAll);


    // Retrieve a single masques with id
    router.get("/:id", masques.findOne);

    // Delete a masques with id
    router.delete("/:id", masques.delete);

    // Delete all masques
    router.delete("/", masques.deleteAll);

    app.use('/api/masques', router);
};