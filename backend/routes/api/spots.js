const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { Review, Spot, User } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

//Get all spots
router.get("/", asyncHandler(async (req, res) => {
    const spots = await Spot.findAll({
        include: User,
        limit: 30,
    })
    return res.json(spots);
}));

//Get one spot
router.get("/:id", asyncHandler(async (req, res) => {
    const id = req.params.id;
    const spot = await Spot.findByPk(id);

    return res.json(spot);
}));

//Create spot
// router.post("/");
const validateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .notEmpty(),
    check('city')
        .exists({ checkFalsy: true })
        .notEmpty(),
    check('state')
        .exists({ checkFalsy: true })
        .notEmpty(),
    check('country')
        .exists({ checkFalsy: true })
        .notEmpty(),
    check('lat')
        .exists({ checkFalsy: true })
        .notEmpty(),
    check('lng')
        .exists({ checkFalsy: true })
        .notEmpty(),
    check('name')
        .exists({ checkFalsy: true })
        .notEmpty(),
    check('price')
        .exists({ checkFalsy: true })
        .notEmpty(),
    check('url')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isURL({ require_protocol: false, require_host: false }),
    handleValidationErrors,
];

router.post("/", requireAuth, validateSpot, asyncHandler(async (req, res) => {
    const {
        userId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        price,
        url,
    } = req.body;

    const spot = await Spot.build({
        userId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        price,
        url,
    });
    await spot.save();
    
    // const { url } = req.body;
    // const image = await Image.build({
    //     spotId: spot.id,
    //     url
    // });
    // await image.save();

    return res.json({ spot });
}))

// //Update spot
// router.put("/:id")
router.put("/:id", requireAuth, validateSpot, asyncHandler(async (req, res) => {
    const spotId = req.params.id;
    const spot = await Spot.findByPk(spotId);
    const {
        userId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        price,
        url
    } = req.body;

    const updatedSpot = {
        userId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        price,
        url
    };

    const updated = await spot.update(updatedSpot);

    return res.json({ updated });
}))

// //Delete
// router.delete("/:id")
// router.delete("/:id", requireAuth, asyncHandler(async (req, res) => {
router.delete("/:id", requireAuth, asyncHandler(async (req, res) => {
    const spotId = req.params.id;
    const reviews = await Review.findAll({
        where: {
            spotId
        }
    })
    reviews.forEach(review => review.destroy());
    const spot = await Spot.findByPk(spotId);

    // if (res.locals.user.id !== spot.userId) {
    //     const err = new Error("Not Authorized");
    //     err.status = 401;
    //     throw err;
    // }

    const destroyedSpotName = spot.name;
    spot.destroy();
    return res.json({ message: `successfully deleted ${destroyedSpotName}` });
}));

router.get('/:id/reviews', asyncHandler(async function (req, res) {
    const spotId = req.params.id;
    const reviews = await Review.findAll({
        where: {
            spotId
        },
        include: User
    });
    return res.json(reviews);
}));

const validateReviewCreate = [
    check("review")
        .exists({ checkFalsy: true })
        .notEmpty(),
    check("userId")
        .exists({ checkFalsy: true })
        .notEmpty(),
    handleValidationErrors
]

router.post(
    '/:id/reviews',
    requireAuth,
    validateReviewCreate,
    asyncHandler(async function (req, res) {
        const spotId = req.params.id;
        const {
            userId,
            review,
        } = req.body;

        const newReview = await Review.build({
            spotId,
            userId,
            review,
        });
        await newReview.save();

        return res.json(newReview);
    })
);

module.exports = router;