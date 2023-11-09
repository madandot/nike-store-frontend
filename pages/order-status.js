import { useState, useEffect } from "react";

const OrderStatus = () => {
   const [orderStatus, setOrderStatus] = useState(null);

   useEffect(() => {
      // Fetch order status data here
      // Replace the placeholder URL with your actual API endpoint
      fetch("/api/order-status")
         .then((response) => response.json())
         .then((data) => setOrderStatus(data))
         .catch((error) => console.error("Error fetching order status:", error));
   }, []);

   return (
      <div className='flex justify-center items-center h-[500px]'>
         <div className='border border-black w-fit px-4 py-2 rounded-md'>
            <h1 className='font-bold text-2xl py-2'>Order Status Page</h1>
            {orderStatus ? (
               <div>
                  <p className='py-1'>
                     <span className='font-semibold'>Tracking Number :</span> {orderStatus.trackingNumber}
                  </p>
                  <ul>
                     <li className='py-1'>
                        <span className=' font-semibold'>Status : </span>
                        {orderStatus.status}
                     </li>

                     <li className='py-1'>
                        <span className=' font-semibold'>Status : </span>
                        {orderStatus.shipped ? "Order Shipped" : "Waiting for Shipment"}
                     </li>
                     <li className='py-1'>
                        <span className=' font-semibold'>Status : </span>
                        {orderStatus.delivered ? "Order Delivered" : "Waiting for Delivery"}
                     </li>
                  </ul>
               </div>
            ) : (
               <p>Loading order status...</p>
            )}
         </div>
      </div>
   );
};

export default OrderStatus;
