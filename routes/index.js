const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const photoSchema = new mongoose.Schema({
    title: String,
    description: String,
    imageUrl: String
});
const Photo = mongoose.models.Photo || mongoose.model('Photo', photoSchema);

router.get('/', async (req, res) => {
    try {
        const photos = await Photo.find({});
        res.render('index', { photos });
    } catch (err) {
        res.status(500).send('Error fetching photos');
    }
});

module.exports = router;
