import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";




const Header = () => {
   const state = useSelector((state)=> state.handleCart)

  
  return (
   <div  className='bg-dark position-fixed w-100 top-0 nav_all'>
      <div className="container">
            <nav className=" navbar navbar-expand-lg navbar-dark">
               <Link className="navbar-brand header_link" to="/">Logo.Az</Link>
               <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
               <span className="navbar-toggler-icon"></span>
               </button>
               <div className="collapse navbar-collapse all" id="navbarNav">
               <ul className="navbar-nav">
                  <li className="nav-item active">
                     <Link className="nav-link header_link_right" to="/">Home</Link>
                  </li>
                  <li className="nav-item">
                     <Link className="nav-link header_link_right" to="/product">Product</Link>
                  </li>
                  <li className="nav-item">
                      <Link className="nav-link header_link_right" to="/bascet">Cart ({state.length})</Link>
                     
                  </li>
               </ul>
               </div>

            </nav>
         </div>
   </div>
   
   
   
  );
};

export default Header;
