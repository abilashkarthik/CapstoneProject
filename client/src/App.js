
import { ChakraProvider } from '@chakra-ui/react'
import ProductsScreen from './screens/ProductsScreen';
import {Route , BrowserRouter as Router , Routes} from 'react-router-dom';
import Header from './components/Header';
import LandingScreen from './screens/LandingScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import Footer from './components/Footer';
import LoginScreen from './screens/LoginScreen'
import EmailVerificationScreen from './screens/EmailVerificationScreen.jsx';
import PasswordResetScreen from './screens/PasswordResetScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import axios from 'axios';
import { VStack , Spinner  } from '@chakra-ui/react';
import { useState , useEffect } from 'react';
import {GoogleOAuthProvider} from '@react-oauth/google';
import CheckoutScreen from './screens/CheckoutScreen';
import CancelScreen from './screens/CancelScreen';
import YourOrdersScreen from './screens/YourOrdersScreen';
import SuccessScreen from './screens/SuccessScreen';

function App() {

  
  return(
	
			<ChakraProvider>
				<Router>
					<Header />
					<main>
						<Routes>
							<Route path='/products' element={<ProductsScreen />} />
							<Route path='/' element={<LandingScreen />} />
							<Route path='/product/:id' element={<ProductScreen />} />
							<Route path='/cart' element={<CartScreen />} />
							<Route path='/login' element={<LoginScreen />} />
							<Route path='/registration' element={<RegistrationScreen />} />
							<Route path='/email-verify/:token' element={<EmailVerificationScreen />} />
							<Route path='/password-reset/:token' element={<PasswordResetScreen />} />
							<Route path='/checkout' element={<CheckoutScreen />} />
							<Route path='/cancel' element={<CancelScreen />} />
							<Route path='/order-history' element={<YourOrdersScreen />} />
							<Route path='/success' element={<SuccessScreen />} />
						</Routes>
					</main>
					<Footer />
				</Router>
			</ChakraProvider>
		
	);
}

export default App;
