import logo from './logo.svg';
import './App.css';
import { Routes,Route } from 'react-router-dom';
import Home from "./pages/Home"
import Admin from './pages/Admin';
import UserDetails from './pages/UserDetails';
import ViewUser from './pages/ViewUser';

function App() {
  return (
    <div className='m-0'>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path="/user-login" element={<Home/>}/>
        <Route path="/user-details" element={<UserDetails/>}/>
        <Route path='/view-user' element={<ViewUser/>}/>
      </Routes>
    </div>
  );
}

export default App;
