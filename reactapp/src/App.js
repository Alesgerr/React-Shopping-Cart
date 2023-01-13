import './App.css';
import Header from './component/Header';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './component/Home';
import Product from './component/Product';
import ProductDetails from './component/ProductDetails';
import Cart from './component/Cart';
import { Provider } from 'react-redux';
import store from './redux/store'

function App() {
  return (
    <div className="App">
    <Provider store={store}>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route  path='/' element={<Home />}/>
          <Route  path='/product' element={<Product />}/>
          <Route  path='/product/:id' element={<ProductDetails />}/>
          <Route  path='/bascet' element={<Cart />}/>
        </Routes>
      </BrowserRouter>
    </Provider>
    </div>
  );
}

export default App;
