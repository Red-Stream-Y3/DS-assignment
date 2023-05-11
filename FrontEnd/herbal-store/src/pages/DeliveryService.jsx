import React from 'react'
import { OrderDeliveryTable } from '../components';

const DeliveryService = () => {
  return (
    <div>
        <nav className="bg-slate-900 shadow-lg">
          <div className="px-10">
            <div className="flex justify-between h-16">
              <div className="flex">
                <a href="/" className="flex-shrink-0 flex items-center">
                  <div className="text-2xl font-bold text-gray-100"> 
                    Delivery Service
                  </div>
                </a>
                <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                  <a
                    href="/"
                    className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Home
                  </a>
                  <a
                    href="/"
                    className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Services
                  </a>
                  <a
                    href="/"
                    className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    About
                  </a>
                  <a
                    href="/"
                    className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Contact
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <OrderDeliveryTable />
        <div className='mb-0 h-80'>
          <br/>
        </div>
    </div>
    
  )
}

export default DeliveryService