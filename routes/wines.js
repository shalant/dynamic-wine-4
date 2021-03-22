const express = require('express');
const router = express.Router();
const multer = require('multer');
const Wines = require('../models/Wines');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './client/public/uploads/');
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

//request GET ALL wines
router.get('/', (req, res) => {
    Wines.find()
        .then(wine => res.json(article))
        .catch(err => res.status(400).json(`Error: $(err)`));
});


//request add new article
router.post('/add-wine', upload.single('articleImage'), (req, res) => {
    const newWine = new Wines({
        winery: req.body.winery,
        name: req.body.name,
        year: req.body.year,
        articleImage: req.file.originalname,
    });

    newWine
        .save()
        .then(() => res.json('the new wine was posted successfully'))
        .catch(err => res.status(400).json(`Error: ${err}`));
})

//request find article by ID
router.get('/:id', (req, res) => {
    Wines.findById(req.params.id)
        .then((wine) => res.json(wine))
        .catch((err) => res.status(400).json(`Error: ${err}`));        
});

//request find article by ID and UPDATE
router.put('/update/:id', upload.single('articleImage'), (req, res) => {
    Wines.findById(req.params.id)
        .then((wine) => {
            wine.winery = req.body.winery;
            wine.name = req.body.name;
            wine.year = req.body.year;
            wine.articleImage = req.file.originalname;

            wine
                .save()
                .then(() => res.json('The Wine is UPDATED successfully'))
                .catch(err => res.status(400).json(`Error: ${err}`))
        })
        .catch(err => res.status(400).json(`Error: ${err}`))

});

//request find article by and DELETE
router.delete('/:id', (req, res) => {
    Wines.findByIdAndDelete(req.params.id)
        .then(() => res.json('the wine is deleted!'))
        .catch(err => res.status(400).json(`Error: ${err}`))
});

module.exports = router;
