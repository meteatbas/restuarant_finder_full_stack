import React from 'react'
import Header from '../components/Header'
import AddRestuarant from '../components/AddRestuarant'
import RestuarantList from '../components/RestuarantList'

const Home = () => {
    return (
        <div>
            <Header/>
            <AddRestuarant/>
            <RestuarantList/>
        </div>
    )
}

export default Home
