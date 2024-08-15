import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav() {
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
          <div className="ms-auto">
            <Link to="/auth/register" className="btn btn-outline-light text-decoration-none">
              Login/Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
