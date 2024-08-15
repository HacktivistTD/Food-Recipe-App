import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';  // Ensure Axios is imported

function ReadRecipe() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);  // Use `null` as the initial state for a single object

    useEffect(() => {
        axios.get('http://localhost:3001/recipe/recipes-by-id/' + id)
            .then(result => {
                setRecipe(result.data);
            })
            .catch(err => console.log(err));
    }, [id]);

    return (
        <div className="container">
            {recipe ? (
                <div className="mt-4 p-3 border">
                    <h2>{recipe.name}</h2>
                    <img src={recipe.imageUrl} alt={recipe.name} className="img-fluid" />
                    <p>{recipe.description}</p>
                    {/* Add more recipe details here if needed */}
                </div>
            ) : (
                <p>Loading recipe...</p>
            )}
        </div>
    );
}

export default ReadRecipe;
