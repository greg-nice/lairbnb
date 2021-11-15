const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { Review, Spot, User } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

const validateReviewUpdate = [
    // check("userId")
    //     .exists({ checkFalsy: true })
    //     .notEmpty()
    //     .isInt({ min: 0 }),
    // check("spotId")
    //     .exists({ checkFalsy: true })
    //     .notEmpty()
    //     .isInt({ min: 0 }),
    check("review")
        .exists({ checkFalsy: true })
        .notEmpty(),
    handleValidationErrors
]

//update review
router.put("/:id", requireAuth, validateReviewUpdate, asyncHandler(async function (req, res) {
    const reviewId = req.params.id;
    const reviewObj = await Review.findByPk(reviewId);

    const {
        review,
    } = req.body;

    const updatedReview = {
        ...reviewObj,
        review,
    }

    const updated = await reviewObj.update(updatedReview);
    return res.json(updated);
}));

router.delete("/:id", requireAuth, asyncHandler(async function (req, res) {
    const reviewId = req.params.id
    const review = await Review.findByPk(reviewId);
    if (!review) throw new Error('Cannot find review');
    await review.destroy();
    return res.json(review);
}));

module.exports = router;