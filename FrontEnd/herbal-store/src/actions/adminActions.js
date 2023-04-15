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

export const getOrderStats = async (query, setter) => {
    const stats = await axios.get(`http://localhost:9122/v1/query-order`, {query}, config);
    setter(stats.data);
};