import { createContext, useContext, useState } from "react";

const FocusedArticle = createContext();

export const FocusedArticleProvider = ({children}) => {
    const [article, setArticle] = useState({});
    return (
        <FocusedArticle.Provider value={{article, setArticle}}>
            {children}
        </FocusedArticle.Provider>
    )
}

export const useFocusedArticle = () => {
    return useContext(FocusedArticle)
}
