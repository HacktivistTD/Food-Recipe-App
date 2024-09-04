const express = require('express');
const RecipeModel = require('../models/recipe');
const UserModel = require('../models/User');
const router = express.Router();

// Route to create a new recipe
router.post('/create-recipe', (req, res) => {
    RecipeModel.create({
        name: req.body.name,
        description: req.body.description,
        ingredient: req.body.ingredient, // Match the field name in the schema
        imageUrl: req.body.imageUrl,
        userID: req.body.userID // Use correct field name as per schema
    })
    .then(result => {
        return res.json(result);
    })
    .catch(err => {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred while creating the recipe.' });
    });
});

// Route to get all recipes
router.get('/recipes', (req, res) => {
    RecipeModel.find()
    .then(recipes => {
        return res.json(recipes);
    })
    .catch(err => {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred while fetching the recipes.' });
    });
});

// Route to get a recipe by ID
router.get('/recipe-by-id/:id', (req, res) => {
    const id = req.params.id;

    RecipeModel.findById(id) // Use id directly
    .then(result => {
        if (!result) {
            return res.status(404).json({ error: 'Recipe not found' });
        }
        return res.json(result);
    })
    .catch(err => {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred while fetching the recipe.' });
    });
});

// Route to get saved recipes for a user by user ID
router.get('/saved-recipes/:id', (req, res) => {
    const id = req.params.id;

    UserModel.findById(id)
    .then(user => {
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.json(user.savedRecipes);
    })
    .catch(err => {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred while fetching the saved recipes.' });
    });
});

// Route to save a recipe for a user
router.put('/save-recipe', async (req, res) => {
    try {
        const recipe = await RecipeModel.findById(req.body.recipeId);
        const user = await UserModel.findById(req.body.userId);

        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.savedRecipes.push(recipe);
        await user.save();

        return res.json({ savedRecipes: user.savedRecipes });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred while saving the recipe.' });
    }
});

module.exports = router;
