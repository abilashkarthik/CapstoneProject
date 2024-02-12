import {Box, Image , Text , Badge , flex , IconButton , Skeleton, transition} from '@chakra-ui/react';
import {BiExpand} from 'react-icons/bi';
import {addToFavourites , removefromFavourites} from '../redux/actions/productActions';
import {useSelector , useDispatch} from 'react-redux';
import {MdOutlineFavorite , MdOutlineFavoriteBorder} from 'react-icons/md';

import React from 'react'

const ProductCard = ({product }, {loading}) => {

    const dispatch = useDispatch()
    const {favourites} = useSelector((state) => state.products);
  return (
    <Skeleton isLoaded={!loading} _hover={{size:1.5}}>
    <Box
        _hover={{transform: 'scale(1.1)' , transitionDuration:'0.5s'}} 
        borderWidth='1px'
        overflow='hidden'
        p='4'
        shadow='md'>
        <Image src={product.images[1]}/>
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
           colorScheme='cyan' size='sm' />
    </flex>
    
   
    </Box>
    </Skeleton>
  );
};

export default ProductCard;