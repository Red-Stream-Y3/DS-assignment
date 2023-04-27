import {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Navbar, ProductCard } from '../../components'

const ShopPage = () => {
  /*
  // @desc    Fetch shop by id
  // @route   GET /api/shops/:id
  // @access  Public
  const getshopById = asyncHandler(async (req, res) => {
    const shop = await Shop.findById(req.params.id);

    if (shop) {
      res.json(shop);
    } else {
      res.status(404);
      throw new Error('Shop not found');
    }
  });
  */

  const [shopImage, setShopImage] = useState('')
  const [shopDescription, setShopDescription] = useState('')
  const [shopName, setShopName] = useState('')
  const [shopEmail, setShopEmail] = useState('')
  const [shopAddress, setShopAddress] = useState('')
  const [shopPhone, setShopPhone] = useState('')
  const [UserId, setUserId] = useState('')
  const [products, setProducts] = useState([])

  const { id } = useParams();

  useEffect(() => {
    const fetchShop = async () => {
      const { data } = await axios.get(`http://localhost:9120/api/shops/${id}`)
      console.log(data)
      setShopName(data.shopDetails.shopName)
      setShopEmail(data.shopDetails.shopEmail)
      setShopAddress(data.shopDetails.shopAddress)
      setShopPhone(data.shopDetails.shopPhone)
      setShopDescription(data.shopDetails.shopDescription)
      setShopImage(data.shopDetails.shopImage)
      setUserId(data.user)
    }

    fetchShop()
  }, [id])

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get(`http://localhost:9121/api/products/user/${UserId}`)
      console.log(data)
      setProducts(data)
    }

    fetchProducts()
  }, [UserId])


    


  const image = "https://images.unsplash.com/photo-1516876437184-593fda40c7ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80"

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl ml-10 py-10 text-white">
        {/* Shop Info */}
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 ml-0">
            <img src={shopImage} alt={shopName} className="w-full md:w-1/3 rounded-lg" />
            <div className="md:w-2/3 md:ml-8">
            <h2 className="text-3xl font-bold">{shopName}</h2>
            <hr className="my-4" />
            <p className="text-sm">{shopDescription}</p>
            <hr className="my-4" />
            <p className="text-lg">Email : {shopEmail}</p>
            <p className="text-lg">Adsress : {shopAddress}</p>
            <p className="text-lg">Phone : {shopPhone}</p>
            </div>
        </div>
      </div>
      <div className="container mx-auto p-10 bg-lightbg max-w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {products.map((product) => (
            <ProductCard key={product._id} product={product} />
            ))}
        </div>
      </div>
    </div>
  )
}

export default ShopPage