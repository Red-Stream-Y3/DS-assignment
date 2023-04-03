import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = () => {
  return (
    <>
      <div className="bg-lightbg border-t-2 border-b-2 border-secondary">
        <div className="container py-4 b">
          <nav className="d-flex">
            <h6 className="mb-0 ml-20">
              <Link className="text-white font-bold">Home</Link>
              <span className="text-white mx-2">
                {' '}
                <i className="fa-solid fa-angle-right"></i>{' '}
              </span>
              <Link className="text-white font-bold">Category</Link>
              <span className="text-white mx-2">
                {' '}
                <i className="fa-solid fa-angle-right"></i>{' '}
              </span>
              <Link className="text-secondary ">Product</Link>
            </h6>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Breadcrumb;
