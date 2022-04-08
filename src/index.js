const express = require('express');

const restaurantController = require('./controller/restaurant.controller');

const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use("/restaurants", restaurantController);

module.exports = app;