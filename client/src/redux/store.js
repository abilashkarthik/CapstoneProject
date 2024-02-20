import {combineReducers , configureStore } from '@reduxjs/toolkit';

import products from './slices/products';
import Cart from './slices/Cart';

const reducer = combineReducers(
    {
        products,
        Cart,
    }
);

export default configureStore({reducer});