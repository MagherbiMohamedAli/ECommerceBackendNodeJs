var express = require('express');
var router = express.Router();
const Categorie = require("../models/categorie")

//category list display
router.get('/', async (req, res,) => {
    try {
        const cat = await Categorie.find();

        res.status(200).json(cat);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
//add cat
router.post('/', async (req, res) => {
    const { nomcategorie, imagecategorie } = req.body;
    const newCategorie = new Categorie({
        nomcategorie: nomcategorie,
        imagecategorie: imagecategorie
    })
    try {
        await newCategorie.save();
        res.status(200).json(newCategorie);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
// cat search
router.get('/:categorieId', async (req, res) => {
    try {
        const cat = await Categorie.findById(req.params.categorieId);

        res.status(200).json(cat);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// edit cat
router.put('/:categorieId', async (req, res) => {

    try {

        const cat = await Categorie.findByIdAndUpdate(
            req.params.categorieId,
            {$set: req.body},
            {new: true}
        );
        res.status(200).json(cat);
    }
    catch (error){
        res.status(404).json({message: error.message});
    }      
});
//delete cat
router.delete('/:categorieId', async (req, res) => {
    const id = req.params.categorieId;
    await Categorie.findByIdAndDelete(id);
    res.json({ message: "category deleted successfully." });

});
module.exports = router;