const express = require('express');
const multer = require('multer');
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const path = require('path');


const router = express.Router();


const storage = multer.diskStorage({
    destination: './public/images',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });


const photoSchema = new mongoose.Schema({
    title: String,
    description: String,
    imageUrl: String
});
const Photo = mongoose.models.Photo || mongoose.model('Photo', photoSchema);

router.get('/', (req, res) => {
    res.render('upload',{errors: [] });
});

router.post('/', upload.single('image'), [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('description').not().isEmpty().withMessage('Description is required')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('upload', { errors: errors.array() });
    }

    const newPhoto = new Photo({
        title: req.body.title,
        description: req.body.description,
        imageUrl: '/images/' + req.file.filename
    });

    try {
        await newPhoto.save();
        res.redirect('/');
    } catch (err) {
        res.status(500).send('Error uploading photo');
    }
});

module.exports = router;
