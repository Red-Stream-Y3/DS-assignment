import React from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Navbar, ProductCard } from '../../components'


const Search = () => {
  const searchTerm = useParams().searchTerm;

  const [searchResults, setSearchResults] = useState([]);
  const [filterResults, setFilterResults] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:9121/api/products/search/${searchTerm}`)
      .then((res) => {
        setSearchResults(res.data)
        setFilterResults(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [searchTerm])

  const onChange = (e) => {
    const value = e.target.value;
    if (value === 'under10') {
      setFilterResults(searchResults.filter((product) => product.price < 10));
    }

    if (value === '10to50') {
      setFilterResults(searchResults.filter((product) => product.price >= 10 && product.price <= 50));
    }

    if (value === '50to100') {
      setFilterResults(searchResults.filter((product) => product.price >= 50 && product.price <= 100));
    }



  };
  return (
    <div>
      <Navbar />
      <div>
        <h1 className="text-3xl text-left text-white font-bold pt-10 pl-5">Search Results for {searchTerm}</h1>
      </div>
      <div className='search-filter'>
        <div className="flex flex-wrap items-center justify-between px-20 py-5 bg-darkbg my-10 mx-40 rounded-md">
        <div className="flex items-center">
          <label htmlFor="price" className="mr-2 font-medium text-white">
            Price:
          </label>
          <select
            id="price"
            className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            onChange={onChange}
          >
            <option value="">Any</option>
            <option value="under10">Under $10</option>
            <option value="10to50">$10 - $50</option>
            <option value="over50">Over $50</option>
          </select>
        </div>
        <div className="flex items-center">
          <label htmlFor="rating" className="mr-2 font-medium text-white">
            Rating:
          </label>
          <select
            id="rating"
            className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            onChange={onChange}
          >
            <option value="">Any</option>
            <option value="4andUp">4 Stars & Up</option>
            <option value="3andUp">3 Stars & Up</option>
            <option value="2andUp">2 Stars & Up</option>
            <option value="1andUp">1 Star & Up</option>
          </select>
        </div>
        <div className="flex items-center">
          <label htmlFor="recent" className="mr-2 font-medium text-white">
            Time Frame:
          </label>
          <select
            id="recent"
            className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            onChange={onChange}
          >
            <option value="">Anytime</option>
            <option value="mostRecent">Most Recent</option>
          </select>
        </div>
      </div>

      </div>
      <div className="search-results">
        <div className="container mx-auto p-10 bg-lightbg max-w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {filterResults.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search