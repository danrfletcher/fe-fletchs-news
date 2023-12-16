import { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';

const NavigationHistory = createContext();

export const NavigationHistoryProvider = ({children}) => {
    const [page, setPage] = useState([]);
    const location = useLocation();

    useEffect(() => {
        setPage(prev => [...prev, location.pathname])
        console.log(page)
    },[location]);
    return (
        <NavigationHistory.Provider value={{page, setPage}}>
            {children}
        </NavigationHistory.Provider>
    )
}

export const useNavigationHistory = () => {
    return useContext(NavigationHistory)
}
