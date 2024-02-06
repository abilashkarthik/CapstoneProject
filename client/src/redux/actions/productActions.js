import { setProducts , setLoading , setError , setPagination} from "../slices/products";
import axios from "axios";


export const getProducts =(page , favouriteToggle) => async (dispatch) =>{

    dispatch(setLoading())
    try{
      
        const {data} = await axios.get('/api/products');
        const {products , pagination} = data ;
        dispatch(setProducts(products));
        dispatch(setPagination(pagination));
    }
    catch(error)
    {
        dispatch(setError(error));
    }


};