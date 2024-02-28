import {combineReducers , configureStore } from '@reduxjs/toolkit';

import products from './slices/products';
import Cart from './slices/Cart';
import user from './slices/user'
import order from './slices/order';

const reducer = combineReducers(
    {
        products,
        Cart,
        user,
        order,
    }
);

export default configureStore({reducer});