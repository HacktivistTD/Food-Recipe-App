const express = require('express');
const RecipeModel = require('./models/recipe');

const router = express.Router();

router.post('/create-recipe', (req, res) => {
    RecipeModel.create({
        name: req.body.name,
        description: req.body.description,
        ingredient: req.body.ingredient, // Match the field name in the schema
        imageUrl: req.body.imageUrl,
        userID: req.body.userId // Match the field name in the schema
    })
    .then(result => {
        return res.json(result);
    })
    .catch(err => {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred while creating the recipe.' });
    });
});

router.get('/recipies', (req, res) => {
    RecipeModel.find()
    .then(recipies => {
        return res.json(recipies);
    })
    .catch(err => {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred while fetching the recipes.' });
    });


router.get('/recipe-by-id/:id',(req,res) =>{

    const id= req.params.id;
    RecipeMode.findById({_id:id})
    .then(result=>{
        return res.json(result.data)
    })
})    
});

module.exports = router;
