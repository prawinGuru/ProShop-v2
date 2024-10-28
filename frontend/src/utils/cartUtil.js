// prices are always displayed with two decimal points.
// .toFixed(2) converts number to string with exactly two decimal places
export const addDecimals = (num) => {
    return (Math.round(num * 100)/100).toFixed(2); 
}

export const updateCart = (state) => {
    // Calculate items price
            // acc- accumulator parameter used in the reduce
            // acc - Holds the accumulated result
            // 0 - default acc value
            state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));

            // Calculate shipping price (If order is over 100 then free, else 10)
            state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

            // Calculate tax price (15%)
            state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));

            // Calculate total price
            state.totalPrice = (
                Number(state.itemsPrice) +
                Number(state.shippingPrice) +
                Number(state.taxPrice)
            ).toFixed(2);
// JSON.stringify(state): Converts the state object to a JSON string format before storing.
localStorage.setItem('cart', JSON.stringify(state));

return state;
}