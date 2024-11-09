/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

function Account() {
  const [orders, setOrders] = useState([]);

  async function fetchUserOrders() {
    try {
      const userId = localStorage.getItem('authToken');
      const response = await fetch(`/api/${userId}/orders`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const orders = await response.json();
      setOrders(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  }

  useEffect(() => {
    fetchUserOrders();
  }, []);

  return (
    <div className="p-4 max-w-screen-lg mx-auto">
      <div className="mt-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-300">My Orders</h2>
        {orders.length > 0 ? (
          <ul className="space-y-4">
            {orders.map((order, index) => (
              <li key={index} className="border p-4 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <p className="text-sm sm:text-base text-gray-400">Contents: 
                  {order.orderList.map((item, idx) => (
                    <span key={idx} className="text-gray-300">
                      {item.name}{idx < order.orderList.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </p>
                <p className="text-sm sm:text-base text-gray-400">Order Cost: ${order.totalCost}</p>
                <p className="text-sm sm:text-base text-gray-400">
                  Order Date: {new Date(order.orderDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No orders placed yet.</p>
        )}
      </div>
    </div>
  );
}

export default Account;
