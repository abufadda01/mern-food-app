import { createContext, useContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
import { axiosObj } from "../utils/axios";


export const StoreContext = createContext(null);



const StoreContextProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("");
    const [foodList, setFoodList] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);



    const addToCart = async (itemId) => {

        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }

        try {

            if (token) {

                await axiosObj.post(`/cart/addToCart`, { itemId }, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
            }

        } catch (error) {
            console.log(error);
        }
    };




    const removeFromCart = async (itemId) => {

        setCartItems((prev) => {

            const newCartItems = { ...prev };

            if (newCartItems[itemId] > 1) {
                newCartItems[itemId] -= 1;
            } else {
                delete newCartItems[itemId];
            }

            return newCartItems;

        });


        try {

            if (token) {

                await axiosObj.post(`/cart/remove`, { itemId }, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

            }
            
        } catch (error) {
            console.log(error);
        }
    };




    const getTotalCartAmount = () => {

        let totalAmount = 0;

        for (const item in cartItems) {

            if (cartItems[item] > 0) {
                let itemInfo = foodList.find((product) => product?._id === item);
                totalAmount += itemInfo?.price * cartItems[item];
            }

        }

        return totalAmount;

    };




    const loadCartData = async (token) => {

        try {
            const response = await axiosObj.get(`/cart`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            setCartItems(response.data);

        } catch (error) {
            console.log(error);
        }
    };




    const fetchFoodList = async (currentPage) => {
        try {
            const response = await axiosObj.get(`/food?page=${currentPage}`);
            setFoodList(response.data.foods);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.log(error);
        }
    };




    useEffect(() => {

        const tokenFromStorage = localStorage.getItem("token");

        if (tokenFromStorage) {
            setToken(tokenFromStorage);
        }

    }, []);




    useEffect(() => {
        if (token) {
            loadCartData(token);
            fetchFoodList()
        }
    }, [token]);



    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,
        setToken,
        foodList,
        setFoodList,
        fetchFoodList,
        page,
        setPage,
        totalPages
    };



    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
};

export const useStoreContext = () => {
    return useContext(StoreContext);
};

export default StoreContextProvider;
