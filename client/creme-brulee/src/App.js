import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/Main-section/HomePage';
import OrderOnlinePg from './pages/Main-section/OrderOnlinePg';
import BlogPg from './pages/Main-section/BlogPg';
import AddProductPg from './pages/Main-section/AddProductPg';
import PortfolioPage from './pages/Main-section/PortfolioPage';
import CartPg from './pages/Main-section/CartPg';
import CheckoutPg from './pages/Main-section/CheckoutPg';
import PaymentPg from './pages/Main-section/PaymentPg';
import MyOrderPg from './pages/Main-section/MyOrderPg';
function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/portfolio' element={<PortfolioPage/>} />
          <Route path='/blog' element={<BlogPg/>} />
          <Route path='/order-online' element={<OrderOnlinePg/>} />
          <Route path='/add-product' element={<AddProductPg/>} />
          <Route path='/cart' element={<CartPg/>} />
          <Route path='/checkout' element={<CheckoutPg/>} />
          <Route path='/payment' element={<PaymentPg/>} />
          <Route path='/my-order' element={<MyOrderPg/>} />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
