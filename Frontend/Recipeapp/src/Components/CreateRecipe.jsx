import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateRecipe() {
  const [recipe, setRecipe] = useState({
    name: '',
    description: '',
    ingridient: '',
    imageUrl: '',
    userId: window.localStorage.getItem("id")
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };


  
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3001/recipe/create-recipie', recipe)
      .then(result => {
        navigate('/')
        console.log(result.data);
        alert("Recipe created");
        navigate('/recipe/saved-recipe');
      })
      .catch(err => console.log(err));
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
            <label htmlFor="ingridient">Ingridient</label>
            <input
              type="text"
              placeholder='Ingridient'
              className='form-control'
              name="ingridient"
              value={recipe.ingridient}
              onChange={handleChange}
            />
          </div>
          <div className="mt-3">
            <label htmlFor="imageUrl">Image URL</label>
            <input
              type="text"
              placeholder='Enter URL'
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

export default CreateRecipe;  // <-- Ensure this line is present
