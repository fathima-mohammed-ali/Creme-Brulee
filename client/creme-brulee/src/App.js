import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/Main-section/HomePage';
import ProfilePage from './pages/Main-section/ProfilePage';
function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/profile' element={<ProfilePage/>} />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
