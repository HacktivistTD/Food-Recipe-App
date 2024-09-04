import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';  // Make sure Link is imported

function Home() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/recipe/recipes')
      .then(response => {
        setRecipes(response.data);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="container">
      <div className="d-flex justify-content-center">
        <h2>Recipes</h2>
      </div>
      <div className="row">
        {recipes.map(recipe => (
          <div key={recipe._id} className="col-md-4 mt-4">
            <div className="p-3 border">
             
              
              <img src={recipe.imageUrl} alt={recipe.name} className="img-fluid"  style={{ width: '400px', height: '350px', objectFit: 'cover' }}  />
              <Link to={`/read-recipe/${recipe._id}`} className='text-decoration-none'>
                
                <h3 className="text-center">{recipe.name}</h3> 
                </Link>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
