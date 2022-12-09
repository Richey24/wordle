import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Select from './components/Select';
import Reset from './components/Reset';
import Difficult from './components/Difficult';
import Hangman from './hangman/Hangman';
import Register from './Register';
import Leader from './components/Leader';
import BibleLeader from './components/bibleLeader';
import HangLeader from './hangman/hangLead';
import Sword from './components/Sword';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Select />} />
      <Route path='/word' element={<App />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/select' element={<Difficult />} />
      <Route path='/hangman' element={<Hangman />} />
      <Route path='/reset/:id' element={<Reset />} />
      <Route path='/word/leader' element={<Leader />} />
      <Route path='/bible/leader' element={<BibleLeader />} />
      <Route path='/hangman/leader' element={<HangLeader />} />
      <Route path='/watchman' element={<Sword />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
