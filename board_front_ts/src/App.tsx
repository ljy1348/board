import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/account/Login';
import Regist from './pages/account/Regist';
import Home from './pages/Home';
import BoardList from './pages/board/BoardList';
import BoardRead from './pages/board/BoardRead';
import BoardWrite from './pages/board/BoardWrite';

function App() {
  return (
    <div className="App">
      <Header></Header>

      <Routes>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/regist' element={<Regist/>}></Route>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/board/:page' element={<BoardList/>}></Route>
        <Route path='/board/r/:id' element={<BoardRead/>}></Route>
        <Route path='/board/write' element={<BoardWrite/>}></Route>

      </Routes>
      
      
    </div>
  );
}

export default App;
