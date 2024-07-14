import { createContext, useContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";


export const StoreContext = createContext(null)


const StoreContextProvider = ({children}) => {

    const [cartItems , setCartItems] = useState({})
    const [token , setToken] = useState("")
    const [foodList , setFoodList] = useState([])


    const addToCart = (itemId) => {
        if(!cartItems[itemId]){
            setCartItems((prev) => ({...prev , [itemId] : 1 }))
        }else{
            setCartItems((prev) => ({...prev , [itemId] : prev[itemId] + 1 }))            
        }
    }


    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({...prev , [itemId] : prev[itemId] - 1 }))
    }


    const getTotalCartAmount = () => {
        
        let totalAmount = 0

        for(const item in cartItems){
            if(cartItems[item] > 0){
                let itemInfo = foodList.find((product) => product._id === item)
                totalAmount += itemInfo.price * cartItems[item]
            }
        }

        return totalAmount

    }


    // to not logged out the user every time we refresh the page
    useEffect(() => {
        if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"))
        }
    }, [])



    const contextValue = {
        food_list ,
        cartItems ,
        setCartItems,
        addToCart ,
        removeFromCart ,
        getTotalCartAmount,
        token ,
        setToken,
        foodList,
        setFoodList
    }

    

    return(
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    )
}



export const useStoreContext = () => {
    return useContext(StoreContext) 
}


export default StoreContextProvider