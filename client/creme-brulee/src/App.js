import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/Main-section/HomePage';
import ProfilePage from './pages/Main-section/ProfilePage';
import OrderOnlinePg from './pages/Main-section/OrderOnlinePg';
import AddCakePg from './pages/Main-section/AddCakePg';
import OrderDonutPg from './pages/Main-section/OrderDonutPg';
import AddDonutPg from './pages/Main-section/AddDonutPg';
import OrderDessertPg from './pages/Main-section/OrderDessertPg';
import AddDesert from './pages/Main-section/AddDesert';
import OrderCupCakePg from './pages/Main-section/OrderCupCakePg';
import AddCupCake from './pages/Main-section/AddCupCake';
import BlogPg from './pages/Main-section/BlogPg';
import ShopPage from './pages/Main-section/ShopPage';
function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/profile' element={<ProfilePage/>} />
          <Route path='/blog' element={<BlogPg/>} />
          <Route path='/order-cake' element={<OrderOnlinePg/>} />
          <Route path='/add-cake' element={<AddCakePg/>} />
          <Route path='/order-donut' element={<OrderDonutPg/>} />
          <Route path='/add-donut' element={<AddDonutPg/>} />
          <Route path='/order-dessert' element={<OrderDessertPg/>} />
          <Route path='/add-dessert' element={<AddDesert/>} />
          <Route path='/order-cupcake' element={<OrderCupCakePg/>} />
          <Route path='/add-cupcake' element={<AddCupCake/>} />
          <Route path='/shop' element={<ShopPage/>} />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
