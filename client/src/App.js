import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, Landing, Detail, Form } from './Views';

function App() {
  // const location = useLocation();

  return (
    <div className="App">
      <h1>Videogames</h1>
      <Routes>
        <Route exact path='/' element={<Landing />} />
        <Route path='/home' element={<Home />} />
        <Route exact path='/detail/:id' element={<Detail />} />
        <Route exact path='/create' element={<Form/>} />
      </Routes>
    </div>
  );
}

export default App;
