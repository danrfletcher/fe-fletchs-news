import { createContext, useContext, useState, useEffect } from "react";
import { getToken } from "../utils/token-api";
import { getProfileFromToken } from "../utils/token-api";

const LoggedInUser = createContext();

export const LoggedInUserProvider = ({children}) => {
    const [user, setUser] = useState({});
    
    const checkLogin = async () => {
        try {
            const accessToken = await getToken();
            if (accessToken) {
                const userProfile = await getProfileFromToken(accessToken);
                if (userProfile) {
                    setUser({username: userProfile.username, accessToken: accessToken});
                }
            } else {
                console.log("No access token found")
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
            checkLogin()
    },[]);
    
    return (
        <LoggedInUser.Provider value={{user, setUser}}>
            {children}
        </LoggedInUser.Provider>
    )
}

export const useLoggedInUser = () => {
    return useContext(LoggedInUser)
}
