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

// import Leader from './components/Leader';
import Leader from './views/Leader';
import BibleLeader from './views/Leader/bibleLeader';
import HangLeader from './hangman/hangLead';
import Sword from './components/Sword';
import SwordMain from './components/SwordMain';
import AddSword from './components/AddSword';
import Shield from './components/Shield';
import ShieldMain from './components/ShieldMain';
import AddShield from './components/AddShield';
import AdminLogin from './AdminLogin';
import AdminDashboard from './layouts/dashboard';
// import AdminHome from './views/Admin/AdminHome';
import {
  Activity,
  AdminUser,
  Home,
  AdminLeaderboard,
  Games,
  Incentives,
  Notification
}
  from './pages/dashboard';

import Audit from './components/Audit';
import ToBeDel from './components/ToBeDel';
import SelectNum from './learn/SelectNum';
import Names from './learn/Names';
import Game from './learn/Game';
import QuestionList from './learn/QuestionList';
import AddQuest from './learn/AddQuest';
import LeaderQuiz from './learn/LeaderQuiz';
import Crossword from './views/Crossword/CrosswordPage';
import CrosswordLeader from './views/Crossword/CrosswordLeaderboard';
import StripeContainer from './stripe/StripeContainer';
import Verify from './components/Verify';
import VerifyUser from './components/VerifyUser';
import ProfilePage from './views/Profile/PofilePage';
import Privacy from './views/Privacy/Privacy';
import { ThemeProvider } from "@material-tailwind/react";
import { MaterialTailwindControllerProvider } from "./context"
import CancelSub from './views/Profile/CancelSub';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <MaterialTailwindControllerProvider>
      <ThemeProvider>
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
          <Route path='/audit' element={<Audit />} />
          <Route path='/delete' element={<ToBeDel />} />
          <Route path='/bible/select' element={<SelectNum />} />
          <Route path='/bible/names' element={<Names />} />
          <Route path='/bible/game' element={<Game />} />
          <Route path='/quiz/leader' element={<LeaderQuiz />} />
          <Route path='/question/list' element={<QuestionList />} />
          <Route path='/question/add' element={<AddQuest />} />
          <Route path="/crossword" element={<Crossword />} />
          <Route path="/crossword/leader" element={<CrosswordLeader />} />
          <Route path='/subscription' element={<StripeContainer />} />
          <Route path='/cancel/sub/:id' element={<CancelSub />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/verify/:id' element={<VerifyUser />} />
          <Route path="/user-account" element={<ProfilePage />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path='/admin' element={<AdminDashboard />}>
            <Route path="" element={<Home />} />
            <Route path="audit" element={<Audit />} />
            <Route path="users" element={<AdminUser />} />
            <Route path="trivial" element={<QuestionList />} />
            <Route path="trash" element={<ToBeDel />} />
            <Route path="leaderboards" element={<AdminLeaderboard />} />
          </Route>

        </Routes>
      </ThemeProvider>
    </MaterialTailwindControllerProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
