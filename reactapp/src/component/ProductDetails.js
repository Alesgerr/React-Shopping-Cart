import React, { useEffect, useState } from 'react'
// import { useDispatch } from 'react-redux';
// import { addCart } from '../redux/action';
import { useParams } from 'react-router-dom'
import { NavLink } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useDispatch } from 'react-redux';
import { addCart } from '../redux/action';
const ProductDetails = () => {

   const {id} = useParams()
   const [product,setProduct] = useState([])

   const [loading,setLoading] = useState(false)

   const dispatch  = useDispatch()
   const addProduct  = async (product) =>{
      dispatch(addCart(product))
      // const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      // setProduct(await response.json());
      // localStorage.setItem('product' , JSON.stringify(product))
   }

   useEffect(() => {

      const getProduct = async () => {
         setLoading(true);      
         const response = await fetch(`https://fakestoreapi.com/products/${id}`);
         setProduct(await response.json());
         setLoading(false);
         
      }
      getProduct();
   }, [id])

   const Loading = () => {
      return(
         <>
           <div className='alltop'>
            <div className='row'>
            <div className='col-md-6'>
            <Skeleton height={400}/>
           </div>
           <div className='col-md-6'>
            <Skeleton height={50} width={300}/>
            <Skeleton height={75}/>
            <Skeleton height={25} width={150}/>
            <Skeleton height={50}/>
            <Skeleton height={150}/>
           </div>
            </div>
           </div>
         </>
      )
   }
   const ShowProduct = () => {
      return(
        
            <div className="row alltop">
            <div className="col-md-6">
               <img src={product.image} alt={product.title} 
                  height="300px" width="300px"
                  className='img-fluid'
               />
            </div>
            <div className="col-md-6">
               <h4 className='text-text-uppercase text-black-50'>
                  {product.category}
               </h4>
               <h3 className='display-5 fs-2'>{product.title}</h3>
               <p className="lead fw-bolder">
                  Rating {product.rating && product.rating.rate}
                  <AiFillStar />
               </p>
               <h3 className='display-6 fw-bold my-4 fs-4'>${product.price}</h3>
               <p className="lead fs-5">{product.description}</p>
               <button className='btn btn-outline-dark px-4 py-2' onClick={() => addProduct(product)}>Add to Cart</button>
               <button className='btn btn-outline-dark px-4 py-2 mx-1'>
               <NavLink to={`/bascet`} className="text-decoration-none Nvln">
                 Go to Cart
               </NavLink>
               </button>
            </div>
          
            </div>
         
      )
   }
  return (
    <div>
     <div className="container">
      <div className="row">
         {loading ? <Loading /> : <ShowProduct />}
      </div>
     </div>
    </div>
  )
}

export default ProductDetails