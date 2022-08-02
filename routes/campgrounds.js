const express = require("express")
const router = express.Router()
const {isLoggedIn, isCorrectUser, validateCampground} = require("../middleware")
const {
    index,
    newForm,
    createCampground,
    showCampground,
    renderEditForm,
    updateCampground,
    deleteCampground
} = require('../controllers/campgrounds')

const multer = require("multer")
const {storage} = require("../cloudinary")
const upload = multer({storage})

router.route("/")
    .get(index)
    .post(isLoggedIn, upload.array("image"), validateCampground, createCampground)

router.get("/new", isLoggedIn, newForm)

router.route("/:id")
    .get(showCampground)
    .put(isLoggedIn, isCorrectUser, upload.array("image"), validateCampground, updateCampground)
    .delete(isLoggedIn, isCorrectUser, deleteCampground)

router.get("/:id/edit", isLoggedIn, isCorrectUser, renderEditForm)

module.exports = router