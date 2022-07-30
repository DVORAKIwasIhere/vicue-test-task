import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Brew } from './pages/Brew';
import { Home } from './pages/Home';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/brew/:brewId" element={<Brew />} />
      </Routes>
    </div>
  );
}

export default App;
