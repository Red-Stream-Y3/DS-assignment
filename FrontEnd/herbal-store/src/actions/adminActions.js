import axios from 'axios';

const user = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
    
const config = {};

if (user) {
  config.headers = {
    Authorization: `Bearer ${user.token}`,
  };
}

export const getAllUsers = async (setter) => {
    const users = await axios.get('http://localhost:9120/api/users', config);
    setter(users.data);
};

export const getAllOrders = async (setter) => {
    const orders = await axios.get('http://localhost:9124/api/orders', config);
    setter(orders.data);
};