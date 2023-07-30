import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/Main-section/HomePage';
import ProfilePage from './pages/Main-section/ProfilePage';
import OrderOnlinePg from './pages/Main-section/OrderOnlinePg';
function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/profile' element={<ProfilePage/>} />
          <Route path='/order' element={<OrderOnlinePg/>} />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
