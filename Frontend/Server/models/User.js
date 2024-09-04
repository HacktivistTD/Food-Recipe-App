const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true }, // 'unique' should be lowercase
    password: { type: String, required: true }, // Add a comma here
    savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }] // Correctly define the savedRecipes field
});

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
