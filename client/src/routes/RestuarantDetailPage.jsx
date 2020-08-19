import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { RestuarantsContext } from '../context/RestuarantsContext'
import RestuarantFinder from '../apis/RestuarantFinder'
import StarRating from '../components/StarRating'
import Reviews from '../components/Reviews'
import AddReview from '../components/AddReview'

const RestuarantDetailPage = () => {
    const {id}=useParams()
    const {selectedRestuarant,setSelectedRestuarant}=useContext(RestuarantsContext)

    useEffect(()=>{
        const fetchData=async()=>{
            try {
                const response=await RestuarantFinder.get(`/${id}`);
                console.log(response);
                

                setSelectedRestuarant(response.data.data)
            } catch (err) {
                console.log(err);
            }
            
        }
        fetchData()
    },[])
    return (
        <div>

            {selectedRestuarant && (
                <>
                <h1>{selectedRestuarant.restuarant && selectedRestuarant.restuarant.name}</h1>
                <div className="text-center">
                    <StarRating rating={selectedRestuarant.restuarant && selectedRestuarant.restuarant.average_rating}/>
                </div>
                <div className="mt-3">
                    <Reviews reviews={selectedRestuarant.reviews}/>
                    <span className="text-warning ml-1">
                        {selectedRestuarant.restuarant && selectedRestuarant.restuarant.count ? `(${selectedRestuarant.restuarant.count})`:"(0)"}
                    </span>
                </div>
                <AddReview/>
                </>
            )}
        </div>
    )
}

export default RestuarantDetailPage
