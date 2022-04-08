const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    cost_for_one: { type: Number, required: true },
    min_cost: { type: Number, required: true },
    time_for_preparing: { type: Number, required: true },
    rating: { type: Number, required: true },
    votes: { type: Number, required: true },
    reviews_no: { type: Number, required: true },
    payment_methods: { type: Array, required: true },
    image: { type: String, required: true },
    favourite: { type: Boolean, required: false },
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('Restaurant', restaurantSchema);