import { createContext, useState,useEffect } from "react"

export const FilterContext = createContext();
export const FilterProvider = ({ children }) => {
    // Initialize state from local storage or set to default value
    const [filter, setFilter] = useState(() => {
        const savedFilter = localStorage.getItem('filter');
        return savedFilter !== null ? JSON.parse(savedFilter) : {colors:[],genders:[],sortBy:0};
    });
    // Save state to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem('filter', JSON.stringify(filter));
    }, [filter]);
    return (
        <FilterContext.Provider value={[filter, setFilter]}>
            {children}
        </FilterContext.Provider>
    )
}