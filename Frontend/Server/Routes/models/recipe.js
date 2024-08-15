const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    ingredient: { type: String },
    imageUrl: { type: String },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

const RecipeModel = mongoose.model("Recipe", RecipeSchema);
module.exports = RecipeModel;
