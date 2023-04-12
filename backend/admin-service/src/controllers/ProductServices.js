const getProducts = async () => {
    //list of 10 dummy data objects
    const tempProducts = [{
        _id: "1001",
        name: "Product 1",
        price: "100.00",
        category: "category 1",
        rating: "4.5",
        stock: "100"
    },{
        _id: "1002",
        name: "Product 2",
        price: "200.00",
        category: "category 2",
        rating: "4.5",
        stock: "200"
    },{
        _id: "1003",
        name: "Product 3",
        price: "200.00",
        category: "category 2",
        rating: "4.5",
        stock: "200"
    },{
        _id: "1004",
        name: "Product 4",
        price: "200.00",
        category: "category 2",
        rating: "4.5",
        stock: "200"
    },{
        _id: "1005",
        name: "Product 5",
        price: "200.00",
        category: "category 3",
        rating: "3.5",
        stock: "200"
    },{
        _id: "1006",
        name: "Product 6",
        price: "200.00",
        category: "category 2",
        rating: "4.2",
        stock: "200"
    },{
        _id: "1007",
        name: "Product 7",
        price: "200.00",
        category: "category 3",
        rating: "2.5",
        stock: "200"
    },{
        _id: "1008",
        name: "Product 8",
        price: "200.00",
        category: "category 3",
        rating: "1.5",
        stock: "200"
    },{
        _id: "1009",
        name: "Product 9",
        price: "200.00",
        category: "category 1",
        rating: "4.5",
        stock: "200"
    },{
        _id: "1010",
        name: "Product 10",
        price: "200.00",
        category: "category 1",
        rating: "4.9",
        stock: "200"
    }];

    //async function to get data from DB
    // const products = await Product.find();

    return tempProducts;
}

module.exports = {
    getProducts
};