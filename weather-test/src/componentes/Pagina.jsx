import React, { useEffect,useState } from 'react';
import Citys from './Citys';
import Graph from './Graph';
const current1 = 'https://api.weatherapi.com/v1/current.json?key=c3489276aee74fcf883184752232509&q='
const forecast = 'https://api.weatherapi.com/v1/forecast.json?key=c3489276aee74fcf883184752232509&q='

function convertTo24HourFormat(time) {
  const [hourMinute, ampm] = time.split(' ');
  const [hour, minute] = hourMinute.split(':');

  if (ampm.toLowerCase() === 'pm' && hour !== '12') {
    return `${parseInt(hour, 10) + 12}:${minute}`;
  } else if (ampm.toLowerCase() === 'am' && hour === '12') {
    return `00:${minute}`;
  } else {
    return `${hour.padStart(2, '0')}:${minute}`;
  }
}

function formatToBrazilianTime(time24h) {
  const [hour, minute] = time24h.split(':');
  return `${hour.padStart(2, '0')}:${minute}`;
}

function obterDiaSemanaPorNumero(numero) {
  const diasSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
  
  if (numero >= 0 && numero <= 6) {
    return diasSemana[numero];
  } else {
    return 'Número de dia inválido. Informe um número de 0 a 6.';
  }
}

function categorizeWeatherCondition(conditionText,isNoite) {
  console.log(isNoite);
  // Condições de clima sem nuvem
  var clearConditions = ["Clear", "Sunny"];

  // Condições de clima com poucas nuvens
  var partlyCloudyConditions = ["Partly cloudy"];

  // Condições de clima com muitas nuvens
  var cloudyConditions = ["Cloudy", "Overcast"];

  // Condições de chuva
  var rainConditions = ["Rain", "Light rain", "Moderate rain", "Heavy rain", "Showers", "Light showers", "Moderate showers", "Heavy showers"];

  // Condições de neve
  var snowConditions = ["Snow", "Light snow", "Moderate snow", "Heavy snow"];

  // Condições de trovão
  var thunderstormConditions = ["Thunderstorms"];

  // Verifica a categoria da condição do clima
  if (clearConditions.includes(conditionText)) {
    if(isNoite==1){document.getElementById('fundo').style.background = ' linear-gradient(180deg, rgb(136, 187, 241) 0%, rgb(89, 126, 213) 54.17%)';
    document.documentElement.style.background = ' linear-gradient(180deg, rgb(136, 187, 241) 0%, rgb(89, 126, 213) 54.17%)';
    document.getElementById('climaAtu').src = "/img/sol-2-1.png";
    document.getElementById('sol').src = "/img/solgif.gif"; 
    document.getElementById('fundo2').style.backgroundColor = '#597cd6';
    document.getElementById('sol').style.opacity = '25%';
   }
    else{ 
    document.getElementById('fundo').style.background = ' linear-gradient(180deg, rgb(26, 94, 166) 0%, rgb(15, 56, 106) 50%, rgb(7, 23, 59) 100%)';
    document.documentElement.style.background = ' linear-gradient(180deg, rgb(26, 94, 166) 0%, rgb(15, 56, 106) 50%, rgb(7, 23, 59) 100%)';
    document.getElementById('climaAtu').src = "/img/estrelas-da-lua (3).png";
    document.getElementById('sol').src = "/img/noitegif.gif";
    document.getElementById('fundo2').style.backgroundColor = '#0c225ab2';
    document.getElementById('sol').style.opacity = '35%';}
  } else if (partlyCloudyConditions.includes(conditionText)) {
    if(isNoite==1){document.getElementById('fundo').style.background = ' linear-gradient(180deg, rgb(136, 187, 241) 0%, rgb(89, 126, 213) 54.17%)';
    document.documentElement.style.background = ' linear-gradient(180deg, rgb(136, 187, 241) 0%, rgb(89, 126, 213) 54.17%)';
    document.getElementById('climaAtu').src = "/img/nuvens-sol-1-1.png";
    document.getElementById('sol').src = "/img/perfectcloud-1.gif"; 
    document.getElementById('fundo2').style.backgroundColor = '#597cd6';
    document.getElementById('sol').style.opacity = '25%'; }
    else {document.getElementById('fundo').style.background = ' linear-gradient(180deg, rgb(26, 94, 166) 0%, rgb(15, 56, 106) 50%, rgb(7, 23, 59) 100%)';
    document.documentElement.style.background = ' linear-gradient(180deg, rgb(26, 94, 166) 0%, rgb(15, 56, 106) 50%, rgb(7, 23, 59) 100%)';
    document.getElementById('climaAtu').src = "/img/estrelas-da-lua (3).png";
    document.getElementById('sol').src = "/img/noitegif.gif";
    document.getElementById('fundo2').style.backgroundColor = '#0c225ab2';
    document.getElementById('sol').style.opacity = '35%';}
  } else if (cloudyConditions.includes(conditionText)) {
    if(isNoite==1){document.getElementById('fundo').style.background = 'linear-gradient(180deg,rgb(155.23, 161.27, 167.66) 0%,rgb(63.39, 67.25, 72.04) 50%,rgb(49.58, 51.21, 55.04) 100%';
    document.documentElement.style.background = 'linear-gradient(180deg,rgb(155.23, 161.27, 167.66) 0%,rgb(63.39, 67.25, 72.04) 50%,rgb(49.58, 51.21, 55.04) 100%';
    document.getElementById('climaAtu').src = "/img/nuvens-1-2.png";
    document.getElementById('sol').src = "/img/perfectcloud-1.gif";
    document.getElementById('fundo2').style.backgroundColor = '#616161b2';
    document.getElementById('sol').style.opacity = '35%';}
    else {document.getElementById('fundo').style.background = ' linear-gradient(180deg, rgb(26, 94, 166) 0%, rgb(15, 56, 106) 50%, rgb(7, 23, 59) 100%)';
    document.documentElement.style.background = ' linear-gradient(180deg, rgb(26, 94, 166) 0%, rgb(15, 56, 106) 50%, rgb(7, 23, 59) 100%)';
    document.getElementById('climaAtu').src = "/img/estrelas-da-lua (3).png";
    document.getElementById('sol').src = "/img/noitegif.gif";
    document.getElementById('fundo2').style.backgroundColor = '#0c225ab2';
    document.getElementById('sol').style.opacity = '35%';}
  } else if (rainConditions.includes(conditionText)) {
    document.getElementById('fundo').style.background = 'linear-gradient(180deg,rgb(155.23, 161.27, 167.66) 0%,rgb(63.39, 67.25, 72.04) 50%,rgb(49.58, 51.21, 55.04) 100%';
    document.documentElement.style.background = 'linear-gradient(180deg,rgb(155.23, 161.27, 167.66) 0%,rgb(63.39, 67.25, 72.04) 50%,rgb(49.58, 51.21, 55.04) 100%';
    document.getElementById('climaAtu').src = "/img/chuva-certa.png";
    document.getElementById('sol').src = "/img/chuvagif2.gif";
    document.getElementById('fundo2').style.backgroundColor = '#303236b2';
    document.getElementById('sol').style.opacity = '30%'; 
  } else if (snowConditions.includes(conditionText)) {
    document.getElementById('fundo').style.background = 'linear-gradient(180deg,  rgb(255, 255, 255) 0%,  rgb(217.9, 217.97, 218.06) 0.01%, rgb(129.08, 129.33, 129.62) 58.33%,rgb(0, 0, 0) 100%)';
    document.documentElement.style.background = 'linear-gradient(180deg,  rgb(255, 255, 255) 0%,  rgb(217.9, 217.97, 218.06) 0.01%, rgb(129.08, 129.33, 129.62) 58.33%,rgb(0, 0, 0) 100%)';
    document.getElementById('climaAtu').src = "/img/flocos-de-neve.png";
    document.getElementById('sol').src = "/img/nevegif.gif"; 
    document.getElementById('fundo2').style.backgroundColor = '#6b6767b2';
    document.getElementById('sol').style.opacity = '20%'; 
  } else if (thunderstormConditions.includes(conditionText)) {
    document.getElementById('fundo').style.background = 'linear-gradient(180deg,rgb(155.23, 161.27, 167.66) 0%,rgb(63.39, 67.25, 72.04) 50%,rgb(49.58, 51.21, 55.04) 100%';
    document.documentElement.style.background ='linear-gradient(180deg,rgb(155.23, 161.27, 167.66) 0%,rgb(63.39, 67.25, 72.04) 50%,rgb(49.58, 51.21, 55.04) 100%';
    document.getElementById('climaAtu').src = "/img/trovoada-2-1.png";
    document.getElementById('sol').src = "/img/trovao.gif";
    document.getElementById('fundo2').style.backgroundColor = '#303236b2';
    document.getElementById('sol').style.opacity = '30%'; 
  } else {
      return "Outro";
  }
}
function categorizeWeatherConditionWeek(conditionText) {

  var clearConditions = ["Clear", "Sunny"];
  var partlyCloudyConditions = ["Partly cloudy"];
  var cloudyConditions = ["Cloudy", "Overcast"];
  var rainConditions = ["Rain", "Light rain", "Moderate rain", "Heavy rain", "Showers", "Light showers", "Moderate showers", "Heavy showers", "Patchy rain possible"];
  var snowConditions = ["Snow", "Light snow", "Moderate snow", "Heavy snow", "Patchy snow possible"];
  var sleetConditions = ["Patchy sleet possible"];
  var freezingDrizzleConditions = ["Patchy freezing drizzle possible"];
  var thunderyOutbreaksConditions = ["Thundery outbreaks possible"];
  var blowingSnowConditions = ["Blowing snow"];
  var blizzardConditions = ["Blizzard"];
  var fogConditions = ["Fog"];
  var freezingFogConditions = ["Freezing fog"];
  var lightDrizzleConditions = ["Patchy light drizzle"];
  var freezingDrizzleConditions = ["Freezing drizzle"];
  var heavyFreezingDrizzleConditions = ["Heavy freezing drizzle"];
  var lightRainConditions = ["Patchy light rain"];
  var moderateRainConditions = ["Light rain", "Moderate rain", "Patchy rain"];
  var heavyRainConditions = ["Heavy rain"];
  var lightFreezingRainConditions = ["Light freezing rain"];
  var moderateHeavyFreezingRainConditions = ["Moderate or heavy freezing rain"];
  var lightSleetConditions = ["Light sleet"];
  var moderateHeavySleetConditions = ["Moderate or heavy sleet"];
  var lightSnowConditions = ["Patchy light snow"];
  var moderateSnowConditions = ["Light snow", "Moderate snow", "Patchy moderate snow"];
  var heavySnowConditions = ["Heavy snow", "Patchy heavy snow"];
  var icePelletsConditions = ["Ice pellets"];
  var lightRainShowerConditions = ["Light rain shower"];
  var moderateHeavyRainShowerConditions = ["Moderate or heavy rain shower"];
  var torrentialRainShowerConditions = ["Torrential rain shower"];
  var lightSleetShowersConditions = ["Light sleet showers"];
  var moderateHeavySleetShowersConditions = ["Moderate or heavy sleet showers"];
  var lightSnowShowersConditions = ["Light snow showers"];
  var moderateHeavySnowShowersConditions = ["Moderate or heavy snow showers"];
  var lightShowersIcePelletsConditions = ["Light showers of ice pellets"];
  var moderateHeavyShowersIcePelletsConditions = ["Moderate or heavy showers of ice pellets"];
  var lightRainThunderConditions = ["Patchy light rain with thunder"];
  var moderateHeavyRainThunderConditions = ["Moderate or heavy rain with thunder"];
  var lightSnowThunderConditions = ["Patchy light snow with thunder"];
  var moderateHeavySnowThunderConditions = ["Moderate or heavy snow with thunder"];

  if (clearConditions.includes(conditionText)) {
    return "/img/sol-2.png";
  } else if (partlyCloudyConditions.includes(conditionText)) {
    return "/img/nuvens-sol-1-1.png";
  } else if (cloudyConditions.includes(conditionText)) {
    return "/img/nuvens-1-2.png";
  } else if (rainConditions.includes(conditionText)) {
    return  "/img/chuva-certa.png";
  } else if (snowConditions.includes(conditionText)) {
      return "/img/flocos-de-neve.png";
  } else if (sleetConditions.includes(conditionText)) {
    return  "/img/chuva-certa.png";
  } else if (freezingDrizzleConditions.includes(conditionText)) {
    return  "/img/chuva-certa.png";
  } else if (thunderyOutbreaksConditions.includes(conditionText)) {
    return "/img/trovoada-2-1.png";
  } else if (blowingSnowConditions.includes(conditionText)) {
      return "/img/flocos-de-neve.png";
  } else if (blizzardConditions.includes(conditionText)) {
      return "/img/flocos-de-neve.png";
  } else if (fogConditions.includes(conditionText)) {
    return "/img/nuvens-1-2.png";
  } else if (freezingFogConditions.includes(conditionText)) {
      return "/img/flocos-de-neve.png";
  } else if (lightDrizzleConditions.includes(conditionText)) {
    return  "/img/chuva-certa.png";
  } else if (freezingDrizzleConditions.includes(conditionText)) {
    return  "/img/chuva-certa.png";
  } else if (heavyFreezingDrizzleConditions.includes(conditionText)) {
    return  "/img/chuva-certa.png";
  } else if (lightRainConditions.includes(conditionText)) {
    return  "/img/chuva-certa.png";
  } else if (moderateRainConditions.includes(conditionText)) {
    return  "/img/chuva-certa.png";
  } else if (heavyRainConditions.includes(conditionText)) {
    return  "/img/chuva-certa.png";;
  } else if (lightFreezingRainConditions.includes(conditionText)) {
    return  "/img/chuva-certa.png";
  } else if (moderateHeavyFreezingRainConditions.includes(conditionText)) {
    return  "/img/chuva-certa.png";
  } else if (lightSleetConditions.includes(conditionText)) {
    return  "/img/chuva-certa.png";
  } else if (moderateHeavySleetConditions.includes(conditionText)) {
    return  "/img/chuva-certa.png";
  } else if (lightSnowConditions.includes(conditionText)) {
    return "/img/icon_light_snow.png";
  } else if (moderateSnowConditions.includes(conditionText)) {
    return "/img/icon_moderate_snow.png";
  } else if (heavySnowConditions.includes(conditionText)) {
    return "/img/flocos-de-neve.png";
  } else if (icePelletsConditions.includes(conditionText)) {
    return "/img/flocos-de-neve.png";
  } else if (lightRainShowerConditions.includes(conditionText)) {
    return  "/img/chuva-certa.png";
  } else if (moderateHeavyRainShowerConditions.includes(conditionText)) {
    return  "/img/chuva-certa.png";
  } else if (torrentialRainShowerConditions.includes(conditionText)) {
    return  "/img/chuva-certa.png";
  } else if (lightSleetShowersConditions.includes(conditionText)) {
    return  "/img/chuva-certa.png";
  } else if (moderateHeavySleetShowersConditions.includes(conditionText)) {
    return  "/img/chuva-certa.png";
  } else if (lightSnowShowersConditions.includes(conditionText)) {
    return "/img/flocos-de-neve.png";
  } else if (moderateHeavySnowShowersConditions.includes(conditionText)) {
    return "/img/flocos-de-neve.png";
  } else if (lightShowersIcePelletsConditions.includes(conditionText)) {
    return "/img/flocos-de-neve.png";
  } else if (moderateHeavyShowersIcePelletsConditions.includes(conditionText)) {
    return "/img/flocos-de-neve.png";
  } else if (lightRainThunderConditions.includes(conditionText)) {
    return  "/img/chuva-certa.png";
  } else if (moderateHeavyRainThunderConditions.includes(conditionText)) {
    return  "/img/chuva-certa.png";
  } else if (lightSnowThunderConditions.includes(conditionText)) {
    return "/img/flocos-de-neve.png";
  } else if (moderateHeavySnowThunderConditions.includes(conditionText)) {
    return "/img/flocos-de-neve.png";
  } else {
    return "Outro";
  }
}
function scrollToTop() {
  const conteudo = document.getElementById('overlap');
  conteudo.scrollTop = 0;
}
let temperaturas = [];




export const Pagina = () => {
  const [temperaturasA, setTemperaturasA] = useState([]);
  const handleValueChange = (value)=>{
    console.log(value.name);
    infos(value.name);
    
    console.log('Temperaturas para as próximas 24 horas:', temperaturas);

    async function infos(cidade){
      temperaturas = [];
      console.log("oi")
      const response = await fetch(current1+cidade+"&aqi=no");
      const response2 = await fetch(forecast+cidade+"&days=10&aqi=no&alerts=no");
      var data = await response.json();
      var data2 = await response2.json();
      console.log(data);
      console.log(data2);
      const sunsetTime = data2.forecast.forecastday[0].astro.sunset;
      const sunriseTime = data2.forecast.forecastday[0].astro.sunrise;
      const sunriseTime24h = convertTo24HourFormat(sunriseTime);
      const sunsetTime24h = convertTo24HourFormat(sunsetTime);
    
      const horas = 24;  // Total de horas que queremos armazenar
    
    // Obter a hora atual
    
    
    
      
      document.getElementById('sunset').innerHTML = formatToBrazilianTime(sunsetTime24h);
      document.getElementById('sunrise').innerHTML = formatToBrazilianTime(sunriseTime24h);
      var conditionText = data.current.condition.text;
      var isnoite = data.current.is_day  // Obtém o texto da condição do clima da sua API
      categorizeWeatherCondition(conditionText,isnoite);
      document.getElementById('tempAtu').innerHTML = Math.round(data.current.temp_c)+"°C";
      document.getElementById('visibili').innerHTML = data.current.vis_km+"Km";
      document.getElementById('ventoV').innerHTML = data.current.wind_kph+"Km/h";
      document.getElementById('humidade').innerHTML = data.current.humidity+"%";
      document.getElementById('sensTermic').innerHTML = Math.round(data.current.feelslike_c)+"°C";
      document.getElementById('pressAtm').innerHTML = data.current.pressure_mb+"hPa";
      document.getElementById('precip').innerHTML = data.current.precip_mm+"mm";
      document.getElementById('mintemp').innerHTML = "Min.: "+Math.round(data2.forecast.forecastday[0].day.mintemp_c)+"°C"+" - Max.:"+Math.round(data2.forecast.forecastday[0].day.maxtemp_c)+"°C";
      document.getElementById('mm1').innerHTML =  Math.round(data2.forecast.forecastday[1].day.mintemp_c)+"°C"+" - "+Math.round(data2.forecast.forecastday[1].day.maxtemp_c)+"°C";
      document.getElementById('media1').innerHTML = Math.round(data2.forecast.forecastday[1].day.avgtemp_c)+"°C";
      document.getElementById('dia1').innerHTML = new Date().getDate()+1+"/"+ new Date().getMonth();
      document.getElementById('diasem1').innerHTML = obterDiaSemanaPorNumero(new Date().getDay()+1);
      document.getElementById('mm2').innerHTML =  Math.round(data2.forecast.forecastday[2].day.mintemp_c)+"°C"+" - "+Math.round(data2.forecast.forecastday[2].day.maxtemp_c)+"°C";
      document.getElementById('media2').innerHTML = Math.round(data2.forecast.forecastday[2].day.avgtemp_c)+"°C";
      document.getElementById('dia2').innerHTML = new Date().getDate()+2+"/"+ new Date().getMonth();
      document.getElementById('diasem2').innerHTML = obterDiaSemanaPorNumero(new Date().getDay()+2);
      document.getElementById('mm3').innerHTML =  Math.round(data2.forecast.forecastday[3].day.mintemp_c)+"°C"+" - "+Math.round(data2.forecast.forecastday[3].day.maxtemp_c)+"°C";
      document.getElementById('media3').innerHTML = Math.round(data2.forecast.forecastday[3].day.avgtemp_c)+"°C";
      document.getElementById('dia3').innerHTML = new Date().getDate()+3+"/"+ new Date().getMonth();
      document.getElementById('diasem3').innerHTML = obterDiaSemanaPorNumero(new Date().getDay()+3);
      document.getElementById('mm4').innerHTML =  Math.round(data2.forecast.forecastday[4].day.mintemp_c)+"°C"+" - "+Math.round(data2.forecast.forecastday[4].day.maxtemp_c)+"°C";
      document.getElementById('media4').innerHTML = Math.round(data2.forecast.forecastday[4].day.avgtemp_c)+"°C";
      document.getElementById('dia4').innerHTML = new Date().getDate()+4+"/"+ new Date().getMonth();
      document.getElementById('diasem4').innerHTML = obterDiaSemanaPorNumero(new Date().getDay()+4);
      document.getElementById('mm5').innerHTML =  Math.round(data2.forecast.forecastday[5].day.mintemp_c)+"°C"+" - "+Math.round(data2.forecast.forecastday[5].day.maxtemp_c)+"°C";
      document.getElementById('media5').innerHTML = Math.round(data2.forecast.forecastday[5].day.avgtemp_c)+"°C";
      document.getElementById('dia5').innerHTML = new Date().getDate()+5+"/"+ new Date().getMonth();
      document.getElementById('diasem5').innerHTML = obterDiaSemanaPorNumero(new Date().getDay()+5);
      document.getElementById('imagem1').src =categorizeWeatherConditionWeek(data2.forecast.forecastday[1].day.condition.text);
      document.getElementById('imagem2').src =categorizeWeatherConditionWeek(data2.forecast.forecastday[2].day.condition.text);
      document.getElementById('imagem3').src =categorizeWeatherConditionWeek(data2.forecast.forecastday[3].day.condition.text);
      document.getElementById('imagem4').src =categorizeWeatherConditionWeek(data2.forecast.forecastday[4].day.condition.text);
      document.getElementById('imagem5').src =categorizeWeatherConditionWeek(data2.forecast.forecastday[5].day.condition.text);
     /* document.getElementById('dia').innerHTML = data.current.last_updated;
      document.getElementById('cidade').innerHTML = data.location.name;
      document.getElementById('clima').innerHTML = data.current.condition.text;*/
      const horaAtual = new Date().getHours();
    
      for (let i = 0; i < horas; i++) {
        // Calcular o índice correspondente à hora
        const indiceHora = (horaAtual + i) % 24;
      
        // Obter a temperatura para a hora atual
        const temperaturaAtual = Math.round(data2.forecast.forecastday[0].hour[indiceHora].temp_c);
      
        // Armazenar a temperatura no array
        temperaturas.push(temperaturaAtual);
      }
      setTemperaturasA(temperaturas);
    
    }
    
  };
  
 
const randomKey = Math.random();
  return (
    <div className="ensolarado" id="fundo">
      
        <div className="overlap" id="fundo2" >
          <div id="overlap">
          <div className="text-wrapper" id="diasem1">DOMINGO</div>
          <div className="text-wrapper-2"id="dia1">16/05</div>
          <img className="line" alt="Line" src="/img/line-2.svg" />
          <div className="text-wrapper-3" id="mm1">14°C - 22°C</div>
          <div className="text-wrapper-4" id="media1">20°C</div>
          <img className="trovoada" alt="Trovoada" id="imagem1" src="/img/trovoada-4.png" />
          <div className="text-wrapper-5" id="diasem2">SEGUNDA</div>
          <div className="text-wrapper-6"id="dia2">17/05</div>
          <img className="img" alt="Line" src="/img/line-3.svg" />
          <div className="text-wrapper-7"id="mm2">15°C - 25°C</div>
          <div className="text-wrapper-8" id="media2">22°C</div>
          <div className="text-wrapper-9" id="diasem3">TERÇA</div>
          <div className="text-wrapper-10"id="dia3" >18/05</div>
          <img className="line-2" alt="Line" src="/img/line-4.svg" />
          <div className="text-wrapper-11" id="mm3">16°C - 24°C</div>
          <div className="text-wrapper-12" id="media3">21°C</div>
          <img className="trovoada-2" alt="Trovoada" id="imagem3" src="/img/trovoada-4.png" />
          <div className="text-wrapper-13" id="diasem4">QUARTA</div>
          <div className="text-wrapper-14" id="dia4">19/05</div>
          <img className="line-3" alt="Line" src="/img/line-5.svg" />
          <div className="text-wrapper-15" id="mm4">14°C - 22°C</div>
          <div className="text-wrapper-16" id="media4">20°C</div>
          <img className="sol-nuvem" alt="Sol nuvem" id="imagem2" src="/img/sol-nuvem-2.png" />
          <img className="sol" alt="Sol3" id="imagem4" src="/img/sol-2.png" />
          <img className="sol-2" alt="Sol2" id="imagem5" src="/img/sol-2.png" />
          <div className="overlap-group">
            <div className="rectangle"/>
          </div>
          </div>
          <div className="overlap-2">
            
            <img className="por-do-sol" alt="Por do sol" src="/img/por-do-sol-1.png" />
            <div className="text-wrapper-17">Pôr do Sol</div>
            <div className="text-wrapper-18" id="sunset">18:55</div>
            <div className="text-wrapper-19">Nascer do Sol</div>
            <div className="text-wrapper-20" id="sunrise">6:16</div>
            <div className="text-wrapper-21" id="humidade">65%</div>
            <div className="text-wrapper-22">Humidade</div>
            <div className="text-wrapper-23">Velocidade do Vento</div>
            <div className="text-wrapper-24" id="ventoV">5 km/h</div>
            <img className="rectangle-2" alt="Rectangle" src="/img/rectangle-11.svg" />
            <img className="sunrise-alt" alt="Sunrise alt" src="/img/sunrise-alt-3.png" />
            <img className="pipeline" alt="Pipeline" src="/img/pipeline-1-2.png" />
            <img className="temperature-high" alt="Temperature high" src="/img/temperature-high-2.png" />
            <img className="cloud-rain" alt="Cloud rain" src="/img/cloud-rain-1-2.png" />
            <img className="wind" alt="Wind" src="/img/wind-1-2.png" />
            <img className="low-vision" alt="Low vision" src="/img/low-vision-2.png" />
            <img className="humidity" alt="Humidity" src="/img/humidity-2.png" />
            <div className="text-wrapper-25">Visibilidade</div>
            <div className="text-wrapper-26" id="visibili">4 km</div>
            <div className="text-wrapper-27">Precipitação</div>
            <div className="text-wrapper-28" id="precip">8%</div>
            <div className="text-wrapper-29">Pressão Atmosférica</div>
            <div className="text-wrapper-30" id="pressAtm">1013 hPa</div>
            <div className="text-wrapper-31">Sensação Térmica</div>
            <div className="text-wrapper-32" id="sensTermic">20°C</div>
          </div>
          <div className="text-wrapper-33" id="diasem5">QUINTA</div>
          <div className="text-wrapper-34" id="dia5">20/05</div>
          <div className="text-wrapper-35" id="media5">20°C</div>
          <div className="text-wrapper-36" id="mm5">14°C - 22°C</div>
        </div>
           
        <div className="overlap-group-2">        
        <img className="ezgif" id="sol" alt="Ezgif" src="/img/solgif.gif" />
          <div className="text-wrapper-37">Mother Nature’s Mood</div>
          <div className="p" id="mintemp">Mín.: 14°C - Máx.: 22°C</div>
          <Graph temperaturas={temperaturasA}  />
          <div className="text-wrapper-69"id="tempAtu">20°C</div>
          <img className="sol-3" id="climaAtu" alt="Sol" src="/img/sol-2-1.png" />
          
          <img className="rectangle-3" alt="Rectangle" src="/img/rectangle-12.svg" />
          <img className="icon-search" alt="Icon search" src="/img/icon-search.png" />
          <div className="porto-alegre-RS">Porto Alegre, RS,&nbsp;&nbsp;Brasil</div>
        </div>
  
        <Citys onValueChange={handleValueChange} />
        
        
    </div>
  );
};
export default Pagina;