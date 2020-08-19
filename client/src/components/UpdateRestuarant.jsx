import React, { useState, useContext, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { RestuarantsContext } from '../context/RestuarantsContext';
import RestuarantFinder from '../apis/RestuarantFinder';

const UpdateRestuarant = (props) => {
    // const test= useParams()
    // console.log(test);
    const {id}=useParams();
    let history=useHistory()
    const {restuarants}=useContext(RestuarantsContext)
    const [name,setName]=useState("")
    const [location,setLocation]=useState("")
    const [priceRange,setPriceRange]=useState("")

    useEffect(()=>{
        const fetchData=async()=>{
            const response=await RestuarantFinder.get(`/${id}`)
            console.log(response.data.data);
            setName(response.data.data.restuarant.name)
            setLocation(response.data.data.restuarant.location)
            setPriceRange(response.data.data.restuarant.price_range)
        }
        fetchData()
    },[]);

    const handleSubmit= async(e)=>{
        e.preventDefault()
        const updatedRestuarant=await RestuarantFinder.put(`/${id}`,{
            name,
            location,
            price_range:priceRange
        })
        history.push("/");
    }

    return (
        <div>
            <form action="">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input value={name} onChange={e=>setName(e.target.value)} type="text" id="name" className="form-control"/>
                </div>

                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input value={location} onChange={e=>setLocation(e.target.value)}  type="text" id="location" className="form-control"/>
                </div>

                <div className="form-group">
                    <label htmlFor="price_range">Price Range</label>
                    <input value={priceRange} onChange={e=>setPriceRange(e.target.value)}  type="number" id="price_range" className="form-control"/>
                </div>
                <button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default UpdateRestuarant
