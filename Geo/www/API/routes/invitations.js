module.exports = app => {
    const invitations = require("../controllers/invitation.controller.js");

    var router = require("express").Router();

    // Create a new Invitations
    router.post("/", invitations.create);

    // Retrieve all invitations
    router.get("/", invitations.findAll);


    // Retrieve a single Invitations with id
    router.get("/:id", invitations.findOne);

    // Delete a Invitations with id
    router.delete("/:id", invitations.delete);

    // Delete all invitations
    router.delete("/", invitations.deleteAll);

    app.use('/api/invitations', router);
};