import express from 'express';
import Stripe from 'stripe';
import Order from '../models/Order.js';
import Product from '../models/Product.js';

const stripe = new Stripe(
	'sk_test_51Oo7GfSIMKp4qtXRim9YsyztjbS7QRv8xnOoY64FbLiCwe8OX8WeWoeu28FK7MesyVt1r91N1oC8rqhbcz64emPb00lNrz0VsW'
);

const stripeRoute = express.Router();

const stripePayment = async (req, res) => {
	const data = req.body;
	console.log(req.body);

	let lineItems = [];

	if (data.shipping === 14.99) {
		lineItems.push({
			price: process.env.EXPRESS_SHIPPING_ID,
			quantity: 1,
		});
	} else {
		lineItems.push({
			price: process.env.STANDARD_SHIPPING_ID,
			quantity: 1,
		});
	}

	for (let item of data.cartItems) {
		lineItems.push({
			price: item.stripeId,
			quantity: item.qty,
		});
	};

	const session = await stripe.checkout.sessions.create({
		line_items: lineItems,
		mode: 'payment',
		success_url: 'http://localhost:3000/success',
		cancel_url: 'http://localhost:3000/cancel',
	});

	const order = new Order({
		orderItems: data.cartItems,
		user: data.userInfo._id,
		username: data.userInfo.name,
		email: data.userInfo.email,
		shippingAddress: data.shippingAddress,
		shippingPrice: data.shipping,
		subtotal: data.subtotal,
		totalPrice: data.subtotal + data.shipping,
	});

	const newOrder = await order.save();

	data.cartItems.forEach(async (cartItem) => {
		let product = await Product.findById(cartItem.id);
		product.stock = product.stock - cartItem.qty;
		product.save();
	});

	res.send(
		JSON.stringify({
			orderId: newOrder._id.toString(),
			url: session.url,
		})
	);
};

stripeRoute.route('/').post(stripePayment);

export default stripeRoute;