import React from 'react';
import './App.css'; 

const App: React.FC = () => {
  return (
    <div className="container">
      <h1 className="title">Bienvenido a la compra de entradas</h1>
      <div className="rectangle top">A</div>
      <div className="rectangle left">D</div>
      <div className="court">Cancha</div>
      <div className="rectangle right">B</div>
      <div className="rectangle bottom">C</div>
    </div>
  );
};

export default App;
