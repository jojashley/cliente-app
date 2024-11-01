import React from 'react';
import { useState } from 'react';
import './App.css'; 
import axios from 'axios'; // Si decides usar Axios

const App: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'Graderia' | 'Club' | 'VIP' | null>(null);
  const [responseData, setResponseData] = useState<string | null>(null);

  const handleCategorySelect = async (category: 'Graderia' | 'Club' | 'VIP') => {
    setSelectedCategory(category);
    
    // Verificar que hay una zona seleccionada
    if (!selectedZone) {
      alert('Por favor, selecciona una zona primero.');
      return;
    }

    // Formar la solicitud
    const request = `display ${category} ${selectedZone}`;
    
    try {
      const response = await axios.post('http://127.0.0.1:8080', { request });
      setResponseData(response.data); // Asignar la respuesta al estado
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      setResponseData('Error al obtener los datos.'); // Mensaje de error
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
          <div className="category" onClick={() => setSelectedCategory('Graderia')}>Graderia</div>
          <div className="category" onClick={() => setSelectedCategory('Club')}>Club</div>
          <div className="category" onClick={() => setSelectedCategory('VIP')}>VIP</div>
        </div>
      )}

      {selectedCategory && (
        <div className="selected-category">
          <h2>Categoría</h2>
          <h3>{selectedCategory}</h3>
          <h2>Asientos</h2> {/* Nuevo encabezado para Asientos */}
          {responseData && (
            <pre>{responseData}</pre> // Muestra la respuesta aquí
          )}
        </div>
      )}
    </div>
  );
};

export default App;
