module.exports = app => {
    const etats = require("../controllers/etat.controller.js");

    var router = require("express").Router();

    // Create a new etats
    router.post("/", etats.create);

    // Retrieve all etats
    router.get("/", etats.findAll);


    // Retrieve a single etats with id
    router.get("/:id", etats.findOne);

    // Update a Geotchatteur with id
    router.put("/:id", etats.update);

    // Delete a etats with id
    router.delete("/:id", etats.delete);

    // Delete all etats
    router.delete("/", etats.deleteAll);

    app.use('/api/etats', router);
};