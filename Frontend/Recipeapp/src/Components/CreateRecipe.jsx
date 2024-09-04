import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateRecipe() {
  const [recipe, setRecipe] = useState({
    name: '',
    description: '',
    ingredient: '',
    imageUrl: ''
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Trimming the inputs to avoid issues with spaces
    const trimmedRecipe = {
      ...recipe,
      name: recipe.name.trim(),
      description: recipe.description.trim(),
      ingredient: recipe.ingredient.trim(),
      imageUrl: recipe.imageUrl.trim()
    };

    // Basic validation
    if (!trimmedRecipe.name || !trimmedRecipe.description || !trimmedRecipe.ingredient || !trimmedRecipe.imageUrl) {
      alert("Please fill all fields.");
      return;
    }

    axios.post('http://localhost:3001/recipe/create-recipe', trimmedRecipe)
      .then(result => {
        console.log(result.data);
        alert("Recipe created successfully!");
        navigate('/recipe/saved-recipe');  // Redirect to saved recipes
      })
      .catch(err => {
        console.error(err);
        alert("An error occurred while creating the recipe.");
      });
  };

  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <div className='p-3 border border-1 w-25'>
        <h3>Create Recipe</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder='Enter Name'
              className='form-control'
              name="name"
              value={recipe.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input
              type="text"
              placeholder='Enter Description'
              className='form-control'
              name="description"
              value={recipe.description}
              onChange={handleChange}
            />
          </div>
          <div className="mt-3">
            <label htmlFor="ingredient">Ingredient</label>
            <input
              type="text"
              placeholder='Enter Ingredient'
              className='form-control'
              name="ingredient"
              value={recipe.ingredient}
              onChange={handleChange}
            />
          </div>
          <div className="mt-3">
            <label htmlFor="imageUrl">Image URL</label>
            <input
              type="text"
              placeholder='Enter Image URL'
              className='form-control'
              name="imageUrl"
              value={recipe.imageUrl}
              onChange={handleChange}
            />
          </div>
          <button className='mt-3 btn btn-success w-100' type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default CreateRecipe;
