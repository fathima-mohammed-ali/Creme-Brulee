import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/Main-section/HomePage';
import ProfilePage from './pages/Main-section/ProfilePage';
import OrderOnlinePg from './pages/Main-section/OrderOnlinePg';
import AddCakePg from './pages/Main-section/AddCakePg';
import OrderDonutPg from './pages/Main-section/OrderDonutPg';
import AddDonutPg from './pages/Main-section/AddDonutPg';
function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/profile' element={<ProfilePage/>} />
          <Route path='/order-cake' element={<OrderOnlinePg/>} />
          <Route path='/add-cake' element={<AddCakePg/>} />
          <Route path='/order-donut' element={<OrderDonutPg/>} />
          <Route path='/add-donut' element={<AddDonutPg/>} />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
