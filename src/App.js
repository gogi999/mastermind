import React from 'react';
import './App.css';
import Header from './components/Header';
import GameBoard from './components/GameBoard';

const App = () => {
  return (
    <div className="App">
      <Header />
      <GameBoard />
    </div>
  );
};

export default App;
