const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { Spot, User } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

//Get all spots
router.get("/", asyncHandler(async (req, res) => {
    const spots = await Spot.findAll({
        include: User,
        limit: 10,
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
//TODO: complete validation code below:
const validateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("CUSTOM MESSAGE HERE"),
    check('city'),
    check('state'),
    check('country'),
    check('lat'),
    check('lng'),
    check('name'),
    check('price'),
    handleValidationErrors,
];

router.post("/", requireAuth, validateSpot, asyncHandler(async (req, res) => {
    const {userId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        price} = req.body;

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
    });
    await spot.save();

    return res.json({ spot });
}))

// //Update spot
// router.put("/:id")
router.put("/:id", requireAuth, validateSpot, asyncHandler(async (req, res) => {
    const spotId = req.params.id;
    const spot = Spot.findByPk(spotId);
    const {
        userId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        price
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
        price
    };

    const updated = await spot.update(updatedSpot);

    return res.json({ updated });
}))

// //Delete
// router.delete("/:id")
// router.delete("/:id", requireAuth, asyncHandler(async (req, res) => {
router.delete("/:id", requireAuth, asyncHandler(async (req, res) => {
    const spotId = req.params.id;
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

module.exports = router;