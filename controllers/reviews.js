const Campground = require("../models/campground");
const Review = require("../models/review");

module.exports.createReview = async (req, res, next) => {
    try {
        const campground = await Campground.findById(req.params.id)
        const review = new Review(req.body.review)
        review.author = req.user._id
        campground.reviews.push(review)
        await review.save()
        await campground.save()
        req.flash("success", "Created new review!")
        res.redirect(`/campgrounds/${campground._id}`)
    } catch (e) {
        next(e)
    }
}

module.exports.deleteReview = async (req, res, next) => {
    try {
        const {id, reviewId} = req.params
        //Pulls the item out of the array
        await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId}})
        await Review.findByIdAndDelete(reviewId)
        req.flash("success", "Successfully deleted review")
        res.redirect(`/campgrounds/${id}`)
    } catch (e) {
        next(e)
    }
}