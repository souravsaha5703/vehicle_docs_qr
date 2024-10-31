import React, { useState } from "react";

export const AppContext = React.createContext();

export const AppContextProvider = ({ children }) => {
    const [admin, setAdmin] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <AppContext.Provider value={{ admin, setAdmin, loggedIn, setLoggedIn }}>
            {children}
        </AppContext.Provider>
    );
};