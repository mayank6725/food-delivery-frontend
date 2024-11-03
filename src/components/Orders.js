import React from 'react';
import { useQuery } from '@apollo/client';
import './Orders.css'; // Import your CSS for styling
import { GET_ORDERS, GET_USER } from '../graphql/queries';

const Orders = () => {
  const { loading: loadingUser, error: errorUser, data: userData } = useQuery(GET_USER, {
    fetchPolicy: 'network-only', // Always refetch user data
  });

  const { loading: loadingOrders, error: errorOrders, data: ordersData } = useQuery(GET_ORDERS, {
    variables: {
      userId: userData?.me?.id, // Use optional chaining to avoid errors while loading
    },
    skip: !userData, // Skip the query if userData is not yet available
    fetchPolicy: 'network-only', // Always fetch fresh data from the network
  });

  if (loadingUser) return <div>Loading user...</div>;
  if (errorUser) return <div>Error fetching user: {errorUser.message}</div>;

  if (loadingOrders) return <p>Loading orders...</p>;
  if (errorOrders) return <p>Error fetching orders: {errorOrders.message}</p>;

  const orders = ordersData.orders;
  console.log(orders);
  return (
    <div className="orders-container">
      <h1>Your Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="order-card">
            <h2>Order for {userData.me.username}</h2>
            <p><strong>Restaurant:</strong> {order.restaurant}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <h3>Order Items:</h3>
            <ul>
              {order.orderItems.map((item, idx) => (
                <li key={idx}>
                  {item.name} (x{item.quantity})
                </li>
              ))}
            </ul>
            <p><strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}</p>
            <p>
              <strong>Delivery Address:</strong> {`${order.deliveryAddress.street}, ${order.deliveryAddress.city}, ${order.deliveryAddress.state} ${order.deliveryAddress.pincode}`}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
