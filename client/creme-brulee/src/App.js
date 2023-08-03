import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/Main-section/HomePage';
import ProfilePage from './pages/Main-section/ProfilePage';
import OrderOnlinePg from './pages/Main-section/OrderOnlinePg';
import AddCakePg from './pages/Main-section/AddCakePg';
function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/profile' element={<ProfilePage/>} />
          <Route path='/order' element={<OrderOnlinePg/>} />
          <Route path='/add-cake' element={<AddCakePg/>} />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
