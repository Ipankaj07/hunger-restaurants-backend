const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant.model');

router.get('/', async (req, res) => {
    try {
        const {
            rating,
            payment_methods,
            cost_for_two,
            page,
            limit,
        } = req.query;

        const query = {};

        if (rating) {
            query.rating = { $gte: parseInt(rating) };
        }

        if (payment_methods) {
            query.payment_methods = { $in: payment_methods.split(',') };
        }

        if (cost_for_two) {
            const cost_for_one = parseInt(cost_for_two) / 2;
            query.cost_for_one = { $lte: cost_for_one };
        }

        const restaurants = await Restaurant.find(query)
            .skip(parseInt(page) * parseInt(limit))
            .limit(parseInt(limit))
            .sort({ cost_for_one: 1 });

        const total = await Restaurant.countDocuments(query);

        res.status(200).json({
            restaurants,
            total
        });

    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        res.send(restaurant);
    } catch (err) {
        res.status(500).send(err);
    }
})

router.get('/favourites', async (req, res) => {
    try {
        const restaurants = await Restaurant.find({ favourite: true });
        res.status(200).send(restaurants);
    } catch (err) {
        res.status(500).send(err);
    }
})

router.post('/', async (req, res) => {
    try {
        const restaurant = new Restaurant(req.body);
        await restaurant.save();
        res.status(201).send(restaurant);
    } catch (err) {
        res.status(500).send(err);
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).send(restaurant);
    } catch (err) {
        res.status(500).send(err);
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
        res.status(200).send(restaurant);
    } catch (err) {
        res.status(500).send(err);
    }
})

module.exports = router;

