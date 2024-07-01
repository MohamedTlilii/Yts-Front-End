import React, { useState } from "react";

// // Create the context

export const StoreContext = React.createContext([])

export const AppContext = ({ children }) => {

    const [store, setStore] = useState({
        showNavbar: false

    })

    return (
        <StoreContext.Provider value={[store, setStore]}>
            {children}
        </StoreContext.Provider>
    )
}