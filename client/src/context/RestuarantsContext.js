import React,{useState,createContext} from "react";

export const RestuarantsContext=createContext();

export const RestuarantsContextProvider=props=>{
    const [restuarants,setRestuarants]=useState([]);
    const [selectedRestuarant,setSelectedRestuarant]=useState([])

    const addRestuarants=(restuarant)=>{
        setRestuarants([...restuarants,restuarant])
    };

    return(
        <RestuarantsContext.Provider value={{restuarants,setRestuarants,addRestuarants,selectedRestuarant,setSelectedRestuarant}}>
            {props.children}
        </RestuarantsContext.Provider>
    )
}