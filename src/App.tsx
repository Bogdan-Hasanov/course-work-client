import React from 'react';
import './App.css';
import MoviesBoxWrapper from 'components/MoviesBoxWrapper/MoviesBoxWrapper';
import AppHeader from './components/PageHeader/Header';

function App() {
  return (
    <>
      <header className="App-header">
        <AppHeader />
      </header>
      <body>
        <MoviesBoxWrapper />
      </body>
    </>
  );
}

export default App;
