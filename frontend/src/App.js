import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import {BrowserRouter,Route} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import './App.css';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';

const App=()=> {
  const [cart,setcart]=useState({cartItems: [],shippingAddress: {}});
  const [user,setuser]=useState({});

  // setting items from local storage 
  useEffect(()=>{
    const tempcart=localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart")): {cartItems: [],shippingAddress: {}};
    setcart(tempcart);
    const tempuser=localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):null;
    setuser(tempuser);
  },[]);

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar cart={cart} user={user} setuser={setuser} setcart={setcart} />
          <main>
            <Route path="/" component={HomeScreen} exact />
            <Route path="/product/:id" render={(props)=><ProductScreen {...props} cart={cart} setcart={setcart} />} />
            <Route path="/cart/:id?" render={(props)=><CartScreen {...props} cart={cart} setcart={setcart} />}></Route>
            <Route path="/signin" render={(props)=><SigninScreen {...props} user={user} setuser={setuser} />} />
            <Route path="/register" render={(props)=><RegisterScreen {...props} user={user} setuser={setuser} />} />
            <Route path="/shipping" render={(props)=><ShippingAddressScreen {...props} cart={cart} setcart={setcart} user={user} />} />
            <Route path="/payment" render={(props)=><PaymentMethodScreen {...props} cart={cart} setcart={setcart} />} />
            <Route path="/placeorder" render={(props)=><PlaceOrderScreen {...props} user={user} cart={cart} setcart={setcart} />} />
            <Route path="/order/:id?" render={(props)=><OrderScreen {...props} user={user} />}></Route>
            <Route path="/orderhistory" render={(props)=><OrderHistoryScreen {...props} />}></Route>
            <Route path="/profile" render={(props)=><ProfileScreen {...props} user={user} setuser={setuser} />}></Route>
          </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
