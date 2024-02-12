import React from 'react'
import {IconButton} from '@chakra-ui/react';
import {MdOutlineFavorite , MdOutlineFavoriteBorder} from 'react-icons/md';
import {useDispatch , useSelector} from 'react-redux';
import { toggleFavourites } from '../redux/actions/productActions';

const Header = () => {

  const dispatch = useDispatch();
  const { favouritesToggled } = useSelector((state) => state.products);


  return (
    <>
    {favouritesToggled ? (
        <IconButton icon={<MdOutlineFavorite size='20px' onClick={()=> dispatch(toggleFavourites(false))}/>}
         variant ='ghost'/>
    ): (
    <IconButton icon={<MdOutlineFavoriteBorder size='20px' onClick={()=> dispatch(toggleFavourites(true))}/>}
    variant ='ghost' />)
    } 
    </>
  );
};

export default Header;