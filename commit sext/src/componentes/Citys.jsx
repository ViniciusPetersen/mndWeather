import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const url = "https://api.teleport.org/api/cities/?search=porto&limit=1";

const Citys = () => {
  const [options, setOptions] = useState([
    { value: 'chocolate', label: '' },  
    { value: 'vanilla', label: '' },
    { value: 'chocolate', label: '' },
    { value: 'strawberry', label: '' }
  ]);

  const fetchCityData = async () => {
    const response = await fetch(url);
    const data = await response.json();

    const updatedOptions = data._embedded["city:search-results"].map(city => ({
      label: city.matching_full_name,
      value: city.matching_alternate_names[0].name
    }));

    setOptions(updatedOptions);
  };

  useEffect(() => {
    // Realiza a primeira busca ao montar o componente
    fetchCityData();

    // Atualiza a cada intervalo de tempo (por exemplo, a cada 5 segundos)
    const intervalId = setInterval(() => {
      fetchCityData();
    }, 1000);  // 5000 milissegundos = 5 segundos

    // Limpa o intervalo ao desmontar o componente para evitar memory leaks
    return () => clearInterval(intervalId);
  }, []);  // O array vazio faz com que o useEffect seja executado apenas uma vez, ao montar o componente

  return (
    <div>
      <Select options={options} />
    </div>
  );
};

export default Citys;
