import {Box, Image , Text , Badge , flex , IconButton , Skeleton, transition , useToast, Tooltip} from '@chakra-ui/react';
import {BiExpand} from 'react-icons/bi';
import {addToFavourites , removefromFavourites} from '../redux/actions/productActions';
import {useSelector , useDispatch} from 'react-redux';
import {MdOutlineFavorite , MdOutlineFavoriteBorder} from 'react-icons/md';
import React , {useState} from 'react'
import {Link as ReactLink} from 'react-router-dom';
import { addCartItem } from '../redux/actions/cartAction';
import { useEffect } from 'react';
import { TbShoppingCartPlus } from 'react-icons/tb';

const ProductCard = ({product }, {loading}) => {

    const dispatch = useDispatch()
    const {favourites} = useSelector((state) => state.products);
    const [isShown , setIsShown] = useState(false);
    const { cartItems } = useSelector((state) => state.Cart);
	const toast = useToast();
	const [cartPlusDisabled, setCartPlusDisabled] = useState(false);

    useEffect(() => {
		const item = cartItems.find((cartItem) => cartItem.id === product._id);
		if (item && item.qty === product.stock) {
			setCartPlusDisabled(true);
		}
	}, [product, cartItems]);

    const addItem = (id) => {
		if (cartItems.some((cartItem) => cartItem.id === id)) {
			const item = cartItems.find((cartItem) => cartItem.id === id);
			dispatch(addCartItem(id, item.qty + 1));
		} else {
			dispatch(addCartItem(id, 1));
		}
		toast({
			description: 'Item has been added.',
			status: 'success',
			isClosable: true,
		});
	};

  return (
    <Skeleton isLoaded={!loading}>
    <Box
        _hover={{transform: 'scale(1.1)' , transitionDuration:'0.5s'}} 
        borderWidth='1px'
        overflow='hidden'
        p='4'
        shadow='md'>
        <Image 
        onMouseEnter={()=> setIsShown(true)}
        onMouseLeave={()=>setIsShown(false)}
        src={product.images[isShown && product.images.length === 2 ? 1 : 0]}
        fallbackSrc='https://via.placeholer.com/150'
        alt={product.name}
        height='200px'
        
        />
        {product.stock < 5 ? (
            <Badge colorScheme='yellow'> only {product.stock} </Badge>
        ): product.stock < 1 ?(
            <Badge colorScheme='red'>Sold out </Badge>
        ): 
        (<Badge colorScheme='green'>In Stock</Badge>
    )}
    {product.productIsNew && (
        <Badge ml='2' colorScheme='purple'>
            new
        </Badge>
    )}
    <Text noOfLines={1} fontSize='xl' fontWeight='semibold' mt='2'>
        {product.brand} {' '} {product.name}
    </Text>
    <Text noOfLines={1} fontSize='md'  color='gray.600'>
        {product.subtitle}
    </Text>
    <flex justify='space-between' alignItems='center' mt='2'>
        <Badge colorScheme='cyan'>{product.category}</Badge>
        <Text fontSize='xl' fontWeight='semibold' color='cyan.600'>
       ${product.price}
    </Text>
    </flex>
    <flex justify='space-between' mt='2'>
    {favourites.includes(product._id) ? (
          <IconButton icon={<MdOutlineFavorite size='20px'/>}
           colorScheme='cyan' size='sm' 
           onClick={()=> dispatch(removefromFavourites(product._id))}/>
    ):( <IconButton icon={<MdOutlineFavoriteBorder size='20'/>} 
    colorScheme='cyan' size='sm' 
    onClick={()=> dispatch(addToFavourites(product._id))}
    />)
    
}  
<IconButton icon={<BiExpand size='20'/>}
            as ={ReactLink} to={`/product/${product._id}`}
            colorScheme='cyan' size='sm' />
            	<Tooltip
						isDisabled={!cartPlusDisabled}
						hasArrow
						label={
							!cartPlusDisabled
								? 'You reached the maximum quantity jof the product. '
								: product.stock <= 0
								? 'Out of stock'
								: ''
						}>
						<IconButton
							isDisabled={product.stock <= 0 || cartPlusDisabled}
							onClick={() => addItem(product._id)}
							icon={<TbShoppingCartPlus size='20' />}
							colorScheme='cyan'
							size='sm'
						/>
					</Tooltip>
    </flex>
    
   
    </Box>
    </Skeleton>
  );
};

export default ProductCard;