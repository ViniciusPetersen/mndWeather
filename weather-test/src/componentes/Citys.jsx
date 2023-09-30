import React, { useState, useEffect, useRef } from 'react';




const Citys = ({ onValueChange }) => {
  const teleportInitializedRef = useRef(false);
  

  useEffect(() => {
    const $results = document.querySelector('.results');

    const appendToResult = (value) => {
      const preElement = document.createElement('pre');
      preElement.textContent = JSON.stringify(value, null, 2);
      $results.appendChild(preElement);
      onValueChange(value);
    };

    if (!teleportInitializedRef.current) {
      // Initialize TeleportAutocomplete only if it hasn't been initialized yet
      TeleportAutocomplete.init('.my-input').on('change', function (value) {
        appendToResult(value);
      });
      teleportInitializedRef.current = true; // Set the flag to true after initialization
    }
  }, [onValueChange]);
  return (
    <div className='oi'>
    <input type="text" className="my-input" name="field" tabIndex="1" autoComplete="off"></input>


    <div className="results"></div>
    
    </div>
  );
};

export default Citys;
