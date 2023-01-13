import Card from 'react-bootstrap/Card';
import { NavLink, useParams} from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCart } from '../redux/action';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react'





const Product = () => {

   const {id} = useParams()
   const [data, setData] = useState([])
   const [filter, setFilter] = useState(data)
   const [loading, setLoading] = useState(false)
   let componentMounted = true

   const dispatch  = useDispatch()

  
   const addProduct  = async (product) =>{
      dispatch(addCart(product))
      toast.success('Sebete Elave Edildi!', {
         className:'toast-container',
         position: "bottom-right",
         autoClose: 3000,
         hideProgressBar: false,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "light",
         })

   }
   
   useEffect(() => {
      
      const getProduct = async () =>{
         setLoading(true)
         const res = await fetch("https://fakestoreapi.com/products")

         if(componentMounted){
            setData(await res.clone().json())
            setFilter(await res.json())
            setLoading(false) 
            console.log(filter);
         }
         return () => {
            componentMounted = false;
         }
         
      }
      getProduct()

   }, [])
   const Loading = () => {
      return(
         <>
        <div className="container">
         <div className="row loader-all">
         <div className='col-md-3 loader-all2'>
            <Skeleton height={300}/>
         </div>
         <div className='col-md-3 loader-all2'>
            <Skeleton height={300}/>
         </div>
         <div className='col-md-3 loader-all2'>
            <Skeleton height={300}/>
         </div>
         <div className='col-md-3 loader-all2'>
            <Skeleton height={300}/>
         </div>
         </div>
        </div>
      </>
      )
   }

   const filterProduct = (cat) => {
      const updatelist = data.filter((x) => x.category === cat)
      
      setFilter(updatelist)
   }
 
   const ShowProduct = () => {
      return(
         <>
            <div className="buttons d-flex justify-content-center mb-5 pb-5">
              <button className='buttonss btn btn-outline-dark me-2' onClick={() => setFilter(data)}>All</button>
              <button className='buttonss btn btn-outline-dark me-2' onClick={() => filterProduct("men's clothing")}>Men's Clothing</button>
              <button className='buttonss btn btn-outline-dark me-2' onClick={() => filterProduct("women's clothing")}>Women's Clothing</button>
              <button className='buttonss btn btn-outline-dark me-2' onClick={() => filterProduct("jewelery")}>Jewelery</button>
              <button className='buttonss btn btn-outline-dark me-2' onClick={() => filterProduct("electronics")}>Electronics</button>
            </div>
           
            {filter.map((product) => {
               return(
                  <div className="col-lg-3 col-md-4 col-6 col-xs-12 g-1" key={product.id}>
                     <Card >
                        <NavLink to={`/product/${product.id}`} className="text-decoration-none Nvln">
                        <Card.Img variant="top" src={product.image} />
                        </NavLink>
                        <Card.Body>
                        <Card.Title >{product.title.length > 20 ? product.title.substring(0,19) + "..." : product.title}</Card.Title>
                        <Card.Text className='opacity-75'>
                        {product.description.length > 60 ? product.description.slice(0,78) + "..." : product.description}
                        </Card.Text>
                        <Card.Text className='fw-bolder fs-5'>
                        ${product.price}
                        </Card.Text>
                        <button className='btn btn-outline-dark px-4 py-2 w-100' onClick={() => addProduct(product)}>Add to Cart</button>
                        </Card.Body>
                        
                     </Card>
                     <ToastContainer
                     position="bottom-right"
                     autoClose={5000}
                     hideProgressBar={false}
                     newestOnTop={false}
                     rtl={false}
                     pauseOnFocusLoss
                     draggable
                     pauseOnHover
                     theme="light"
                     />
                     
                     </div>
               )
            })}
         </>
      )
   }
  return (
   <div>
      <div className="container my-5 py-5">
         
            <div className="col-12 mb-5">
               <h1 className='display-5 fw-bolder text-center'>Latest Product</h1>
               <hr />
            </div>
            <div className="row justify-content-center">
               {loading ? <Loading /> : <ShowProduct />}
            </div>
         
      </div>
   </div>
  )
}

export default Product