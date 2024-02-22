
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

function App() {
  
  return (
    <ChakraProvider>
      <Router>
      <Header/>
      <main>
        <Routes>
          <Route path='/products' element={<ProductsScreen></ProductsScreen>} />
          <Route path='/' element={<LandingScreen></LandingScreen>} />
          <Route path='/product/:id' element={<ProductScreen></ProductScreen>} />
          <Route path='/cart' element={<CartScreen></CartScreen>} />
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/email-verify/:token' element={<EmailVerificationScreen />} />
          <Route path='/password-reset/:token' element={<PasswordResetScreen />} />
          <Route path='/registration' element={<RegistrationScreen />} />
        </Routes>
      </main>
      <Footer/>
      </Router>
    </ChakraProvider>
  )
}

export default App;
