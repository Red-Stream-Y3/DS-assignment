import React from "react";
import {ProductCard, Hero } from "../../components";

function HomeProducts() {

    const products = [
        {
          id: 1,
          name: "Organic Lavender Essential Oil",
          price: 15.99,
          imageUrl: "https://images.unsplash.com/photo-1671492241057-e0ad01ceb1c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        },
        {
          id: 2,
          name: "Organic Chamomile Tea",
          price: 9.99,
          imageUrl: "https://images.unsplash.com/photo-1615484477112-677decb29c57?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
        },
        {
          id: 3,
          name: "Organic Peppermint Essential Oil",
          price: 12.99,
          imageUrl: "https://images.unsplash.com/photo-1512867957657-38dbae50a35b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80",
        },
        {
            id: 4,
            name: "Organic Peppermint Essential Oil",
            price: 12.99,
            imageUrl: "https://images.unsplash.com/photo-1512867957657-38dbae50a35b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80",
        },
        {
            id: 5,
            name: "Organic Peppermint Essential Oil",
            price: 12.99,
            imageUrl: "https://images.unsplash.com/photo-1512867957657-38dbae50a35b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80",
        },
        {
            id: 6,
            name: "Organic Peppermint Essential Oil",
            price: 12.99,
            imageUrl: "https://images.unsplash.com/photo-1512867957657-38dbae50a35b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80",
        },
        {
            id: 7,
            name: "Organic Peppermint Essential Oil",
            price: 12.99,
            imageUrl: "https://images.unsplash.com/photo-1512867957657-38dbae50a35b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80",
        },
      ];
      

    return (
        <div>
            <Hero />
            <div className="container mx-auto p-10 bg-lightbg max-w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                    {products.map((product) => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HomeProducts;
