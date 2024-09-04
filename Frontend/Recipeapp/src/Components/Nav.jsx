import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Nav() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear localStorage or any other authentication storage
    window.localStorage.clear();
    // Redirect to the login page or home page
    navigate('/auth/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Food Recipe
        </Link>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav ms-2 me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/recipe/create-recipe" aria-current="page">
                Create
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/recipe/saved-recipe">
                Saved Recipe
              </Link>
            </li>
          </ul>
          {window.localStorage.length ? (
            <button className='btn btn-outline-light' onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link to="/auth/register" className="btn btn-outline-light text-decoration-none">
              Login/Register
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
