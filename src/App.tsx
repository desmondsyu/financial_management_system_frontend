import React from 'react';
import logo from './logo.svg';
import './style/App.css';
import Page from './homepage/page.tsx'

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className='text-5xl font-bold underline'>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Page />
      </header>
    </div>
  );
}
