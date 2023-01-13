import React, { useEffect, useState } from 'react'
import 'react-loading-skeleton/dist/skeleton.css'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineMinus, AiOutlinePlus} from 'react-icons/ai';
import { addCart, delCart } from '../redux/action';
import './Cart.css'
import { Link, NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const Cart = () => {
   const card = useSelector((state)=> state.handleCart)
  
   const [data,setData] = useState([])
   const dispatch = useDispatch()
   const {id} = useParams()
  
  
   useEffect(() => { 
      
      const getProduct = async () => {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      setData(await response.json());
         
      }
      getProduct()
    
      setData(card)      
   },[card])
   const Total = () => {
      return(
        <div className='div'>
            <center className='alltop'>Sebetiniz Boşdur <Link className='text-decoration-none' to='/product'>Alışverişe Devam Ele <hr /></Link></center>
        </div>
      )
   }
  return (
    <div className='container  alltop'>
    <div className=''>
    {
         (data.length === 0) ? <Total /> :
         data.map((product) => {
         
            return(
            <div key={product.id} className='cart_details '>
               <div className="cart d-flex mb-3 ">
                     <NavLink to={`/product/${product.id}`} className="text-decoration-none Nvln">
                        <div className="col-md-4">
                           <img className='' src={product.image} alt={product.title} height='200px' width='170px'/>
                        </div>
                     </NavLink>                      
                      <div className="cart-div col-md-4 px-5">
                        <h5>{product.title}</h5>
                       
                        <p className='lead fw-bold fs-6'>
                           {product.qty} X ${product.price.toFixed(2)} = ${product.qty * product.price.toFixed(2)}
                        </p>
                        <button className='btn btn-outline-dark me-4'  onClick={() => {
                           dispatch(addCart(product));
                           console.log(product);
                        }}><AiOutlinePlus /></button>
                        <button className='btn btn-outline-dark' onClick={() => {
                           dispatch(delCart(product));
                           console.log(product);
                        }}><AiOutlineMinus /></button>
                     </div>
                     
               </div>         
            </div>
            )
         })
      }
    </div>



    </div>
  )
}

export default Cart

