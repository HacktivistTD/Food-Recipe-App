import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Registration from './Components/Registration';
import Login from './Components/Login';
import Home from './Components/Home';
import Nav from './Components/Nav';
import  CreateRecipe from './Components/CreateRecipe';
import SavedRecipie from './Components/SavedRecipie';
import ReadRecipe from './Components/ReadRecipe';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth/register' element={<Registration />} />
          <Route path='/auth/login' element={<Login />} />
          <Route path='/recipe/create-recipe' element={< CreateRecipe />} />
          <Route path='/recipe/saved-recipe' element={<SavedRecipie />} />
          <Route path='/read-recipe/:id' element={<ReadRecipe />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
