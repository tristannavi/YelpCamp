const express = require("express")
const router = express.Router()
const {isLoggedIn, isCorrectUser, validateCampground} = require("../middleware")
const {
    index,
    newForm,
    createCampground,
    showCampground,
    renderEditForm,
    editCampground,
    deleteCampground
} = require('../controllers/campgrounds')

router.route("/")
    .get(index)
    .post(isLoggedIn, validateCampground, createCampground)

router.get("/new", isLoggedIn, newForm)

router.route("/:id")
    .get(showCampground)
    .put(isLoggedIn, isCorrectUser, validateCampground, editCampground)
    .delete(isLoggedIn, isCorrectUser, deleteCampground)

router.get("/:id/edit", isLoggedIn, isCorrectUser, renderEditForm)

module.exports = router