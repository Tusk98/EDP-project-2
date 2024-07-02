import { useState, useEffect } from 'react'
import './App.css'
import Characters from "./components/Characters"
import Character from "./components/Character"


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
        <Route path="/character/:id" element = {<Character />} />

      </Routes>
    </BrowserRouter>
        

    </>
  )
}

export default App
