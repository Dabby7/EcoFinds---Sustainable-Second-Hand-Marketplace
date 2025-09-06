import { Route, Routes } from 'react-router-dom'
import Main from './Components/Main'
import Details from './Components/Details'
import AddProduct from './Components/AddProduct'
import Cart from './Components/Cart'
import Checkout from './Components/Checkout'
import CheckoutSuccess from './Components/CheckoutSuccess'
import { CartProvider } from './Components/CartContext'

function App() {

  return (
    <CartProvider>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/details' element={<Details />} />
        <Route path='/Addproduct' element={<AddProduct />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/checkout-success' element={<CheckoutSuccess />} />
      </Routes>
    </CartProvider>
  )
}

export default App
