import React from 'react'
import Home from './Pages/Home.jsx'
import AddFood from './Pages/AddFood.jsx'
import {Routes,Route} from 'react-router-dom'
import AdminDashboard from './Pages/AdminDashboard.jsx'
import AdminSignup from './Pages/AdminSignup.jsx'
import Cart from './Pages/Cart.jsx'
import { CartProvider } from './context/CartContext.jsx'

import OrderPage from './Pages/OrderPage.jsx'
import About from './Pages/About.jsx'
import Contact  from './Pages/Contact.jsx'
import AdminLogin from './Pages/AdminLogin.jsx'
import ProtectedRoute from './context/ProtectedRoute.jsx'

const App = () => {
  return (
    
    // <Home/>
    // <AddFood/>
    <CartProvider>
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/admin/signup' element={<AdminSignup/>}/>
          <Route path='/admin/login' element={<AdminLogin/>}/>

          <Route path ='/order' element={<OrderPage/>}/>
          <Route path = '/about' element={<About/>}/>
          <Route path = '/contact' element = {<Contact/>}/>
          <Route path='/cart' element={<Cart/>} />




          <Route path='/admin/menu/add' element={
            <ProtectedRoute>

              <AddFood/>
            </ProtectedRoute>

            }/>


          <Route path='/admin/menu/list' element={<ProtectedRoute>

              <AdminDashboard/>
            </ProtectedRoute>}/>

          
        </Routes>

    </CartProvider>
  )
}

export default App