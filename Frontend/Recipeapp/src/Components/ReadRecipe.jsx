import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';  
import SavedRecipie from './SavedRecipie';

function ReadRecipe() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [fetchSavedRecipes, setSavedRecipes] = useState([]);
    const userId = "your-user-id"; // Replace with actual user ID or fetch it dynamically

    useEffect(() => {
        const getRecipe = () => {
            axios.get('http://localhost:3001/recipe/recipe-by-id/' + id)
                .then(result => {
                    setRecipe(result.data);
                })
                .catch(err => console.log(err));
        };
    
        const fetchSavedRecipeData = () => {
            axios.get('http://localhost:3001/recipe/saved-recipes/' + userId)
                .then(result => {
                    setSavedRecipes(result.data); // Adjust depending on your backend response
                })
                .catch(err => console.log(err));
        };

        fetchSavedRecipeData();
        getRecipe();
    }, [id, userId]);

    const saveRecipe = (recipeId) => {
        axios.put('http://localhost:3001/recipe/save-recipe', { userId, recipeId })
            .then(result => {
                console.log(result.data.savedRecipes);  // Adjust based on your backend response
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="container">
            {recipe ? (
                <div className="mt-4 p-3 border">
                    <h2 className="text-center">{recipe.name}</h2>
                    <img 
                        src={recipe.imageUrl} 
                        alt={recipe.name} 
                        style={{ width: '400px', height: '400px', objectFit: 'cover' }} 
                    />
                    <h3>Ingredient</h3>
                    <p>{recipe.ingredient}</p>
                    <h3>Description</h3>
                    <p>{recipe.description}</p>
                    <button className='btn btn-warning' onClick={() => saveRecipe(recipe._id)}>Save</button>
                </div>
            ) : (
                <p>Loading recipe...</p>
            )}
        </div>
    );
}

export default ReadRecipe;
