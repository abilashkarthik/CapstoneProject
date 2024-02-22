import {combineReducers , configureStore } from '@reduxjs/toolkit';

import products from './slices/products';
import Cart from './slices/Cart';
import user from './slices/user'

const reducer = combineReducers(
    {
        products,
        Cart,
        user,
    }
);

export default configureStore({reducer});