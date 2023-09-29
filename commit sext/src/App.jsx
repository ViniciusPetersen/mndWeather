import { useState } from 'react'
import React from 'react';
import WeatherSnb from "./componentes/WeatherSnb"
import Pagina  from "./componentes/Pagina";
import './App.css'


function App() {
  return <div className='app' >
    <h1></h1>
    <Pagina />
    <WeatherSnb />
  
  </div>
}

export default App;
