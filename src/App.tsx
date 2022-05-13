import React from 'react';
import './App.css';
import MoviesBoxWrapper from 'components/MoviesBoxWrapper/MoviesBoxWrapper';
import AppHeader from './components/PageHeader/Header';

function App() {
  return (
    <div>
      <header className="App-header">
        <AppHeader />
      </header>
      <body>
        <MoviesBoxWrapper />
      </body>
    </div>
  );
}

export default App;
