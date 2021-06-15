import React from 'react';
import './App.css';
import MoviesBoxWrapper from 'components/MoviesBoxWrapper/MoviesBoxWrapper';
import AppHeader from './components/PageHeader/Header';
import MovieSlider from './components/MovieSlider/MovieSlider';

function App() {
  return (
    <div>
      <header className="App-header">
        <AppHeader />
      </header>
      <body>
        <MoviesBoxWrapper />
        <MovieSlider />
      </body>
    </div>
  );
}

export default App;
