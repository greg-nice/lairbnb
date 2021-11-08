const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

//Read
router.get("/", asyncHandler(async (req, res) => {
    const spots = await Spot.findAll({
        limit: 10,
    })
    return res.json({ spots });
}));

//Create
// router.post("/");

// //Update
// router.put("/:id")

// //Delete
// router.delete("/:id")




module.exports = router;