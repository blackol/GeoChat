module.exports = app => {
    const geotchatteurs = require("../controllers/geotchatteur.controller.js");

    var router = require("express").Router();

    // Create a new Geotchatteur
    router.post("/", geotchatteurs.create);

    // Retrieve all geotchatteurs
    router.get("/", geotchatteurs.findAll);

    // Retrieve all published geotchatteurs
    router.get("/published", geotchatteurs.findAllPublished);

    // Retrieve a single Geotchatteur with id
    router.get("/:id", geotchatteurs.findOne);

    // Update a Geotchatteur with id
    router.put("/:id", geotchatteurs.update);

    // Delete a Geotchatteur with id
    router.delete("/:id", geotchatteurs.delete);

    // Delete all geotchatteurs
    router.delete("/", geotchatteurs.deleteAll);

    app.use('/api/geotchatteurs', router);
};