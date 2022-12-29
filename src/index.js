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
import SwordMain from './components/SwordMain';
import AddSword from './components/AddSword';
import Shield from './components/Shield';
import ShieldMain from './components/ShieldMain';
import AddShield from './components/AddShield';
import AdminLogin from './AdminLogin';
import Admin from './components/Admin';
import Audit from './components/Audit';
import ToBeDel from './components/ToBeDel';
import SelectNum from './learn/SelectNum';
import Names from './learn/Names';
import Game from './learn/Game';
import QuestionList from './learn/QuestionList';
import AddQuest from './learn/AddQuest';

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
      <Route path='/watchman/:idd' element={<SwordMain />} />
      <Route path='/watchman/create' element={<AddSword />} />
      <Route path='/shield' element={<Shield />} />
      <Route path='/shield/:idd' element={<ShieldMain />} />
      <Route path='/shield/create' element={<AddShield />} />
      <Route path='/admin/login' element={<AdminLogin />} />
      <Route path='/admin' element={<Admin />} />
      <Route path='/audit' element={<Audit />} />
      <Route path='/delete' element={<ToBeDel />} />
      <Route path='/bible/select' element={<SelectNum />} />
      <Route path='/bible/names' element={<Names />} />
      <Route path='/bible/game' element={<Game />} />
      <Route path='/question/list' element={<QuestionList />} />
      <Route path='/question/add' element={<AddQuest />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
