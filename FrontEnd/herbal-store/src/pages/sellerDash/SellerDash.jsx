import React, {useEffect, useState} from "react";

//import { ToastContainer, toast } from "react-toastify";
//import "react-toastify/dist/ReactToastify.css";
import { 
    Navbar, 
    Footer,
    ProductList
    
} from "../../components";

const SellerDash = () => {
    return(
        <>
            <div>
                <Navbar />
                <div className="w-9/12 m-auto justify-center my-3">
                <ProductList />
                </div>
                
                <Footer />
            </div>
            
        </>
    )
}

export default SellerDash