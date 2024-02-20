import {createSlice} from '@reduxjs/toolkit';

const calculateSubTotal = (cartState) => {
    let result =0;
    cartState.map((item) => (result += item.qty * item.price));
    return result ; 
};

export const initialState = {
    loading : false,
    error : null,
    cartItems :JSON.parse(localStorage.getItem('cartItmes'))?? [],
    shipping : JSON.parse(localStorage.getItem('shipping'))?? Number(4.99),
    subtotal: localStorage.getItem('cartItems') ? calculateSubTotal(JSON.parse(localStorage.getItem('cartItems'))) : 0,
};

const updateLocalStorage = (cart) =>{
    localStorage.setItem('cartItems', JSON.stringify(cart));
    localStorage.setItem('subTotal', JSON.stringify(calculateSubTotal(cart)));
};

export const cartSlice = createSlice(
    {
        name : 'cart',
        initialState,
        reducers :{
            setLoading : (state) =>{
                state.loading =true
            },
            setError : (state , {payload} )=>{
                state.error = payload;
                state.loading = false;
            },
            cartItemAdd : (state , {payload}) =>{
                const existingItem = state.cartItems.find((item) => item.id === payload.id);

			if (existingItem) {
				state.cartItems = state.cartItems.map((item) => (item.id === existingItem.id ? payload : item));
			} else {
				state.cartItems = [...state.cartItems, payload];
			}
			state.loading = false;
			state.error = null;
			updateLocalStorage(state.cartItems);
			state.subtotal = Number(calculateSubTotal(state.cartItems));
            },
            cartItemRemoval: (state, { payload }) => {
                state.cartItems = [...state.cartItems].filter((item) => item.id !== payload);
                updateLocalStorage(state.cartItems);
                state.subtotal = calculateSubTotal(state.cartItems);
                state.loading = false;
                state.error = null;
            },
            setShippingCosts: (state, { payload }) => {
                state.shipping = payload;
                localStorage.setItem('shipping', payload);
            },
            clearCart: (state) => {
                localStorage.removeItem('cartItems');
                localStorage.removeItem('shipping');
                localStorage.removeItem('subTotal');
                state.cartItems = [];
                state.shipping = Number(4.99);
                state.subtotal = 0;
                state.loading = false;
                state.error = null;
            },
        },
    }
);

export const { setError, setLoading, cartItemAdd, cartItemRemoval, setShippingCosts, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

export const cartSelector = (state) => state.cart;