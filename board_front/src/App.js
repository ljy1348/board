import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Homes from './pages/Homes';
import Register from './pages/Register';
import Login from './pages/Login';
import Header from './component/Header';
import Admin from './pages/Admin';
import User from './pages/User';
import Board from './pages/Board';


function App() {
  return (
    <div className="App">
      <Header/>

      <Routes>
      <Route path="/" element={<Homes/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/admin" element={<Admin/>}/>
      <Route path="/user" element={<User/>}/>
      <Route path="/board" element={<Board/>}/>

      </Routes>
    </div>
  );
}

export default App;
