import { createContext, useEffect, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [data, setData] = useState([]); // Initialize as an empty array for safe iteration
    const [ordering, setOrdering] = useState("status");
    const [grouping, setGrouping] = useState("title");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const result = await response.json();
                setData(result);
            } catch (err) {
                console.error("Failed to fetch data:", err);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures this runs only once on mount

    const contextValue = {
        data,
        ordering,
        setOrdering,
        grouping,
        setGrouping,
    };

    return (
        <DataContext.Provider value={contextValue}>
            {children}
        </DataContext.Provider>
    );
};
