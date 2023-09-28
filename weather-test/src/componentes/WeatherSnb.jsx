import React from 'react';
import Citys from './Citys';
const current1 = 'https://api.weatherapi.com/v1/current.json?key=c3489276aee74fcf883184752232509&q=Porto Alegre&aqi=no'
const current2 = 'https://api.weatherapi.com/v1/current.json?key=c3489276aee74fcf883184752232509&q=Gramado&aqi=no'

async function infos(){
  console.log("oi")
  const response = await fetch(current1);
  var data = await response.json();
  console.log(data);

  document.getElementById('temp').innerHTML = data.current.temp_c;
  document.getElementById('dia').innerHTML = data.current.last_updated;
  document.getElementById('cidade').innerHTML = data.location.name;
  document.getElementById('clima').innerHTML = data.current.condition.text;

}
async function infos2(){
  console.log("oi")
  const response = await fetch(current2);
  var data = await response.json();
  console.log(data);

  document.getElementById('temp').innerHTML = data.current.temp_c;
  document.getElementById('dia').innerHTML = data.current.last_updated;
  document.getElementById('cidade').innerHTML = data.location.name;
  document.getElementById('clima').innerHTML = data.current.condition.text;

}

const WeatherSnb = () => {

  
  

  return (
    <div>
    <Citys />
    <button onClick={infos2}>Gramado</button>
    <button onClick={infos}>Porto Alegre</button>
    <h1 id='temp' ></h1>
    <h1 id='dia' ></h1>
    <h1 id='cidade'></h1>
    <h1 id='clima'></h1>
   
    </div>
  )
}

export default WeatherSnb;