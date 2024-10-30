import React, { createContext, useState, useContext } from 'react';

export const SubCartContext = createContext();

export const SubCartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const storedCart = localStorage.getItem('cartItems'); // Cambiado a localStorage
        return storedCart ? JSON.parse(storedCart) : [];
    });

    const updateSubCart = (items) => {
        try {
            if (!Array.isArray(items)) {
                throw new Error("El carrito debe ser un array.");
            }
            setCartItems(items);
            localStorage.setItem('cartItems', JSON.stringify(items)); // Cambiado a localStorage
        } catch (error) {
            console.error("Error actualizando el subcarrito:", error);
        }
    };

    const addToSubCart = (item) => {
        console.log("Intentando agregar al subcarrito:", item); // Debug
        try {
            setCartItems((prevCartItems) => {
                const isReservation = item.codigoMesaReserva !== undefined;
                let updatedItems;

                if (isReservation) {
                    // Agrega el objeto `item` directamente, incluyendo los nuevos campos
                    updatedItems = [...prevCartItems, item];
                } else {
                    const existingItemIndex = prevCartItems.findIndex(cartItem => cartItem.idAlimento === item.idAlimento);
                    if (existingItemIndex !== -1) {
                        const updatedItem = {
                            ...prevCartItems[existingItemIndex],
                            quantity: prevCartItems[existingItemIndex].quantity + item.quantity
                        };
                        updatedItems = [
                            ...prevCartItems.slice(0, existingItemIndex),
                            updatedItem,
                            ...prevCartItems.slice(existingItemIndex + 1)
                        ];
                    } else {
                        const newItem = { ...item, quantity: item.quantity };
                        updatedItems = [...prevCartItems, newItem];
                    }
                }

                updateSubCart(updatedItems);
                console.log("Subcarrito actualizado:", updatedItems); // Debug
                return updatedItems;
            });
        } catch (error) {
            console.error("Error agregando al subcarrito:", error);
        }
    };

    const removeFromSubCart = (itemId, quantityToRemove) => {
        console.log("Intentando eliminar del subcarrito:", itemId); // Agregado para debug
        try {
            setCartItems((prevCartItems) => {
                const updatedItems = prevCartItems.reduce((acc, item) => {
                    if (item.idAlimento === itemId) {
                        const newQuantity = item.quantity - quantityToRemove;
                        if (newQuantity > 0) {
                            acc.push({ ...item, quantity: newQuantity });
                        }
                    } else if (item.codigoMesaReserva !== itemId) {
                        acc.push(item);
                    }
                    return acc;
                }, []);

                updateSubCart(updatedItems);
                console.log("Subcarrito actualizado después de eliminar:", updatedItems); // Agregado para debug
                return updatedItems;
            });
        } catch (error) {
            console.error("Error eliminando del subcarrito:", error);
        }
    };

    return (
        <SubCartContext.Provider value={{ cartItems, addToSubCart, removeFromSubCart }}>
            {children}
        </SubCartContext.Provider>
    );
};

export const useSubCart = () => {
    return useContext(SubCartContext);
};
