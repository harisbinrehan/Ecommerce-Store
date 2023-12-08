function generateOrderId() {
  const timestamp = new Date().getTime();
  const uniqueId = Math.floor(100000 + Math.random() * 900000);
  const orderId = `${timestamp}${uniqueId}`.slice(-10);
  return orderId;
}

export default generateOrderId;
