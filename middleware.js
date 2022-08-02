const Campground = require("./models/campground");
const Review = require("./models/review");
const {campgroundSchema, reviewSchema} = require("./schemas/schemas");
const ExpressError = require("./utils/ExpressError");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash("error", "You must be signed in")
        res.redirect("/login")
    } else next()
}

module.exports.isCorrectUser = async (req, res, next) => {
    const {id} = req.params
    const campground = await Campground.findById(id)
    if (!campground.author.equals(req.user._id)) {
        req.flash("error", "You do not have permission to do that")
        res.redirect(`/campgrounds/${id}`)
    } else {
        next()
    }
}

module.exports.isCorrectUserReview = async (req, res, next) => {
    const {id, reviewId} = req.params
    const review = await Review.findById(reviewId)
    if (!review.author.equals(req.user._id)) {
        req.flash("error", "You do not have permission to do that")
        res.redirect(`/campgrounds/${id}`)
    } else {
        next()
    }
}

module.exports.validateCampground = (req, res, next) => {
    const {error} = campgroundSchema.validate(req.body)
    if (error) {
        throw new ExpressError(error.details.map(e => e.message).join(","), 400)
    } else {
        next()
    }
}

module.exports.validateReview = (req, res, next) => {
    const {error} = reviewSchema.validate(req.body)
    if (error) {
        throw new ExpressError(error.details.map(e => e.message).join(","), 400)
    } else {
        next()
    }
}

