import { createContext, useContext, useState } from "react";

const FocusedComments = createContext();

export const FocusedCommentsProvider = ({children}) => {
    const [comments, setComments] = useState({});
    return (
        <FocusedComments.Provider value={{comments, setComments}}>
            {children}
        </FocusedComments.Provider>
    )
}

export const useFocusedComments = () => {
    return useContext(FocusedComments)
}
