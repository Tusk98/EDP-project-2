import { useState, useEffect } from 'react';
import './App.css';
import Characters from "./components/Characters";
import Character from "./components/Character";
import Planets from "./components/Planets";
import Films from "./components/Films";


import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {

  return (
    <>
    <BrowserRouter>
      <div>
        <h1>Star Wars Universe Lookup</h1>
        <label htmlFor="searchString">Who you looking for?(Regular expressions are cool
            here)</label>
       </div>
        
      <Routes>
        <Route path="/" element={<Characters />}/>
        <Route path="/characters/:id" element = {<Character />} />
        <Route path="/films/:id" element={<Films />} />
        <Route path="/planets/:id" element={<Planets />} />

      </Routes>
    </BrowserRouter>
        

    </>
  )
}

export default App
