const express = require("express")
const router = express.Router({mergeParams: true})
const {validateReview, isCorrectUserReview, isLoggedIn} = require("../middleware")
const {createReview, deleteReview} = require("../controllers/reviews")

router.post("/", isLoggedIn, validateReview, createReview)

router.delete("/:reviewId", isLoggedIn, isCorrectUserReview, deleteReview)

module.exports = router