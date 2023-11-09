// pages/api/order-status.js
export default (req, res) => {
   // Replace this with actual logic to fetch order status data
   const orderStatusData = {
      status: "Order Confirmed ",
      trackingNumber: "56849",
   };

   res.status(200).json(orderStatusData);
};
