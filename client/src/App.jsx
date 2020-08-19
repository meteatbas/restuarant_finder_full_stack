import React from 'react';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom"


import Home from "./routes/Home"
import UpdatePage from "./routes/UpdatePage"
import RestuarantDetailPage from "./routes/RestuarantDetailPage"
import { RestuarantsContextProvider } from './context/RestuarantsContext';
const App=()=>{
    return( 
    <RestuarantsContextProvider>
         <div className="container">
        <Router>
            <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/restuarants/:id/update" component={UpdatePage}/>
            <Route exact path="/restuarants/:id" component={RestuarantDetailPage}/>
            </Switch>
        </Router>
    </div>
    </RestuarantsContextProvider>
   
    )};

export default App;