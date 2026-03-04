export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
};

const calculatePrice = (orderItems) => {
    // Calculate items price
    const itemsPrice = orderItems.reduce((acc, item) => acc + item.price * item.qty, 0);

    // Calculate shipping price: if order > $100 free, otherwise $10
    const shippingPrice = itemsPrice > 100 ? 0 : 10;

    // Calculate tax price: 15% tax
    const taxPrice = 0.15 * itemsPrice;

    // Total price
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    return {
        itemsPrice: addDecimals(itemsPrice),
        shippingPrice: addDecimals(shippingPrice),
        taxPrice: addDecimals(taxPrice),
        totalPrice: addDecimals(totalPrice),
    };
};

export default calculatePrice;
