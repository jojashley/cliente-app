import React from 'react';
import { useState } from 'react';
import './App.css'; 
import axios from 'axios'; 

const App: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'Graderia' | 'Club' | 'VIP' | null>(null);
  const [responseData, setResponseData] = useState<string | null>(null);

  const handleCategorySelect = async (category: 'Graderia' | 'Club' | 'VIP') => {
    setSelectedCategory(category);
  
    if (!selectedZone) {
      alert('Por favor, selecciona una zona primero.');
      return;
    }
  
    const requestPayload = {
      request: `display ${category} ${selectedZone}`
    };
  
    try {
      const response = await axios.post(
        'http://127.0.0.1:8080', 
        requestPayload, 
        { headers: { 'Content-Type': 'application/json' } }
      );
      
      setResponseData(response.data); 
      console.log('Response from API:', response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error('Error de respuesta:', error.response.data);
        setResponseData(`Error del servidor: ${error.response.data}`);
      } else if (error instanceof Error) {
        console.error('Error de solicitud:', error.message);
        setResponseData(`Error en la solicitud: ${error.message}`);
      } else {
        console.error('Error desconocido:', error);
        setResponseData('Error desconocido al obtener los datos.');
      }
   }
   
  };

  return (
    <div className="ticket-purchase">
      <h1>Bienvenido a tu compra de entradas</h1>
      
      {!selectedZone && (
        <div className="court">
          <div className="zone top">A</div>
          <div className="zone right">B</div>
          <div className="zone bottom">C</div>
          <div className="zone left">D</div>
        </div>
      )}

      {!selectedZone && (
        <div className="question">
          <h2>Escoge una zona</h2>
          <div className="options">
            <button onClick={() => setSelectedZone('A')}>A</button>
            <button onClick={() => setSelectedZone('B')}>B</button>
            <button onClick={() => setSelectedZone('C')}>C</button>
            <button onClick={() => setSelectedZone('D')}>D</button>
          </div>
        </div>
      )}

      {selectedZone && (
        <div className="categories">
          <div className="category" onClick={() => handleCategorySelect('Graderia')}>Graderia</div>
          <div className="category" onClick={() => handleCategorySelect('Club')}>Club</div>
          <div className="category" onClick={() => handleCategorySelect('VIP')}>VIP</div>
        </div>
      )}

      {selectedCategory && (
        <div className="selected-category">
          <h2>Categoría</h2>
          <h3>{selectedCategory}</h3>
          <h2>Asientos</h2> 
          <p>{responseData}</p> 
        </div>
      )}
    </div>
  );
};

export default App;
