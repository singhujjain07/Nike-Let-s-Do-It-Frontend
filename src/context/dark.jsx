import { createContext, useState,useEffect } from "react"

export const DarkModeContext = createContext();
export const DarkModeProvider = ({ children }) => {
    // Initialize state from local storage or set to default value
    const [darkMode, setDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode !== null ? JSON.parse(savedMode) : true;
    });
    // Save state to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }, [darkMode]);
    return (
        <DarkModeContext.Provider value={[darkMode, setDarkMode]}>
            {children}
        </DarkModeContext.Provider>
    )
}