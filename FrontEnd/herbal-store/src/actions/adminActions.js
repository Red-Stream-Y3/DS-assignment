import axios from "axios";

//get userdata from browser storage
const user = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

//set header for axios
const config = {};
if (user) {
    config.headers = {
        Authorization: `Bearer ${user.token}`,
    };
}

//export functions to be used in components
//get lists
//Users
export const getAllUsers = async (setter) => {
    const users = await axios.get("http://localhost:9120/api/users", config);
    setter(users.data);
};

//Orders
export const getAllOrders = async (setter) => {
    const orders = await axios.get("http://localhost:9124/api/orders", config);
    setter(orders.data);
};

//Products
export const getAllProducts = async (setter) => {};

//get single item
//Order
export const getOrderById = async (id, setter) => {
    const order = await axios.get(
        `http://localhost:9124/api/orders/${id}`,
        config
    );
    setter(order.data);
};

//User
export const getUserById = async (id, setter) => {
    const user = await axios.get(
        `http://localhost:9120/api/users/${id}`,
        config
    );
    setter(user.data);
};

//Commission rate
export const getCommission = async (setter) => {
    const commission = await axios.get(`http://localhost:9122/v1/commission`);
    setter(commission.data.commission);
};

//actions
//confirm order
export const confirmOrder = async (id) => {
    const order = await axios.put(
        `http://localhost:9124/api/orders/${id}/confirm`,
        {},
        config
    );
    return (order!==null);
};

//reject order
export const rejectOrder = async (id, note, user, order) => {
    //update database
    const res = await axios.put(
        `http://localhost:9124/api/orders/${id}/reject`,
        {rejectReason: note},
        config
    );

    let message = `Please note that your order ${order._id} was rejected.\n`;

    if(note) message += `Reason: ${note}\n`;

    //send email to user
    const email = await axios.post(
        `http://localhost:9123/v1/send`,
        {
          to: user.email,   //reciever email address
          subject:"Order Rejected!",  //email subject
          mail: { //this will be used to generate the email body
              header: user.name,   //Bold header of email body
              intro: message,    //first text after header
              tableData:order.orderItems.map((item) => {
                  return {item: item.name, qty: item.quantity, price: item.price};
              }),    //an array of objects for table data, if any
              outro:"Please consider leaving your feedback so we can improve our service.", //ending text
          }
      }
    );
    return (res!==null);
};

//grant/revoke admin privileges to a user
export const grantAdmin = async (user, grant) => {
    //update database
    const res = await axios.put(
        `http://localhost:9120/api/users/${user._id}`,
        {isAdmin:grant},
        config
    );

    //send email to user
    const email = await axios.post(`http://localhost:9123/v1/send`, {
        to: user.email, //reciever email address
        subject: `${grant ? "Admin Privileges Granted!" : "Admin Privileges Revoked!"}`, //email subject
        mail: {
            //this will be used to generate the email body
            header: user.name, //Bold header of email body
            intro: `${
                grant
                    ? "Please note that you have been grante admin privileges."
                    : "Please note that your admin privileges have been revoked."
            }`, //first text after header
            outro: "Please consider leaving your feedback so we can improve our service.", //ending text
        },
    });
    return (res!==null);
};

//query orders
export const queryOrderStats = async (query, filter, setter) => {
    const stats = await axios.post(
        `http://localhost:9122/v1/query-order`,
        {
            query,
            filter,
        },
        config
    );
    setter(stats.data);
};

//get daily sales statistics
export const getDailySales = async (year, month, setter) => {
    await axios.get(`http://localhost:9122/v1/sales/daily/${year}/${month}`)
        .then((res) => {
            try {
                setter((prev) => (
                    {
                        ...prev,
                        sales: {
                            ...prev.sales,
                            daily: res.data[0].sales
                        }
                    }
                ));
            } catch (e) {
                console.log(e);
                setter((prev) => (
                    {
                        ...prev,
                        sales: {
                            ...prev.sales,
                            daily: []
                        }
                    }));
            }
            
        });
}

//get monthly sales statistics
export const getMonthlySales = async (year, setter) => {
    await axios.get(`http://localhost:9122/v1/sales/monthly/${year}`)
        .then((res) => {
            try{
                setter((prev) => (
                    {
                        ...prev, 
                        sales: {
                            ...prev.sales,
                            monthly: res.data[0].sales
                        }
                    }
                ));
            } catch (e) {
                console.log(e);
                setter((prev) => (
                    {
                        ...prev,
                        sales: {
                            ...prev.sales,
                            monthly: []
                        }
                    }));
            }
        });
}

//get yearly sales statistics
export const getYearlySales = async (setter) => {
    await axios.get(`http://localhost:9122/v1/sales/yearly`)
        .then((res) => {
            try{
                setter((prev) => (
                    {
                        ...prev, 
                        sales: {
                            ...prev.sales,
                            yearly: res.data
                        }
                    }
                ));
            } catch (e) {
                console.log(e);
                setter((prev) => (
                    {
                        ...prev,
                        sales: {
                            ...prev.sales,
                            yearly: []
                        }
                    }));
            }
        });
}

//calculate sales/order statistics
export const calculateSales = async (filter, dateItems) => {

    let res;

    switch (filter) {
        case "daily":
            res = await axios.post(`http://localhost:9122/v1/sales/daily`, {year: dateItems.year, month: dateItems.month});
            break;
        case "monthly":
            res = await axios.post(`http://localhost:9122/v1/sales/monthly`, {year: dateItems.year});
            break;
        case "yearly":
            res = await axios.post(`http://localhost:9122/v1/sales/yearly`, {});
            break;
        case "orders":
            res = await axios.post(`http://localhost:9122/v1/orders/monthly`, {year: dateItems.year, month: dateItems.month});
        default:
            break;
    };
    
    return (res.status === 200);
        
};

//get monthly order statistics
export const getMonthlyOrders = async (year, month, setter) => {
    await axios.get(`http://localhost:9122/v1/orders/${year}/${month}`)
        .then((res) => {
            try{
                setter((prev) => (
                    {
                        ...prev, 
                        orders: {
                            ...prev.orders,
                            monthly: res.data[0]
                        }
                    }
                ));
            } catch (e) {
                console.log(e);
                setter((prev) => (
                    {
                        ...prev,
                        orders: {
                            ...prev.orders,
                            monthly: []
                        }
                    }));
            }
        });
};

