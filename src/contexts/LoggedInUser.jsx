import { createContext, useContext, useState } from "react";

const LoggedInUser = createContext();

export const LoggedInUserProvider = ({children}) => {
    const [user, setUser] = useState({});
    return (
        <LoggedInUser.Provider value={{user, setUser}}>
            {children}
        </LoggedInUser.Provider>
    )
}

export const useLoggedInUser = () => {
    return useContext(LoggedInUser)
}
