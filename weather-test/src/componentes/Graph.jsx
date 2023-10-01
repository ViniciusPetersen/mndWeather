import React, { useEffect, useRef, useState } from 'react';

const Graph = ({ temperaturas }) => {
 
  
const maxTemperature = Math.max(...temperaturas);
  const minTemperature = Math.min(...temperaturas);
  const maxHeight = 450; // Altura máxima desejada
  const minHeight = 25;  // Altura mínima desejada
  const ellipseHeight = 20; // Altura da elipse
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
  
    const maxTemperature = Math.max(...temperaturas);
    const minTemperature = Math.min(...temperaturas);
    const maxHeight = 450;
    const minHeight = 25;
  
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // Draw the graph
    for (let i = 0; i < temperaturas.length - 1; i++) {
      const startX = (i * 58) + 54;
      const startY = maxHeight - ((temperaturas[i] - minTemperature) / (maxTemperature - minTemperature)) * (maxHeight - minHeight - 310);
  
      const endX = ((i + 1) * 58) + 54;
      const endY = maxHeight - ((temperaturas[i + 1] - minTemperature) / (maxTemperature - minTemperature)) * (maxHeight - minHeight - 310);
 
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }, [temperaturas, canvasRef]);
  const temperatureElements = temperaturas.map((temperature, index) => {
    const normalizedHeight = ((temperature - minTemperature) / (maxTemperature - minTemperature)) * (maxHeight - minHeight - 310) + minHeight;
    return (
      <div key={index} style={{ position: 'absolute', left: `${(index * 58)+40}px` }}>
        <div
          className={`textgraph textgraph-${index + 61}`}
          style={{
            top: `${maxHeight - normalizedHeight}px`,
            height: `${normalizedHeight}px`,
            minHeight: `${minHeight}px`,
          }}
        >
          {temperature}°C
        </div>
        <div className={`ellipse ellipse-${index + 1}`} style={{
          top: `${maxHeight - normalizedHeight + ellipseHeight}px`,
          left: '10px'
        }} />
      </div>
    );
  });

  const hourElements = Array.from({ length: 24 }).map((_, index) => (
    <div key={index} style={{
         position: 'absolute', 
         left: `${(index * 58)+33}px`,
         top: `${490}px`, 
         }} className={`text-hours text-hours-${index + 38}`}>
      {index < 10 ? `0${index}:00` : `${index}:00`}
    </div>
  ));




  return (
    <div style={{ position: 'relative' }}>
      <div style={{ display: 'flex' }}>
        {hourElements}
      </div>
      <div style={{ position: 'relative', marginTop: '20px' }}>
        {temperatureElements}
      </div>
      <canvas ref={canvasRef} width={1390} height={maxHeight} />
    </div>
  );
}

export default Graph;
