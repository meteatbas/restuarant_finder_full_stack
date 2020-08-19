import React ,{useEffect,useContext} from 'react'
import RestuarantFinder from "../apis/RestuarantFinder"
import { RestuarantsContext } from '../context/RestuarantsContext';
import { useHistory } from 'react-router-dom';
import StarRating from './StarRating';

const RestuarantList = (props) => {
    const{restuarants,setRestuarants} = useContext(RestuarantsContext)
    let history=useHistory()
    useEffect(()=>{
        const fetchData = async() => {
            try {
                const response=await RestuarantFinder.get("/");
                console.log(response.data.data);
                setRestuarants(response.data.data.restuarants)
             } catch (err) {
                
        }
    }
        
        fetchData();
    },[]);

    const handleDelete=async (b,id)=>{
        b.stopPropagation()
        try {
          const response= await RestuarantFinder.delete(`/${id}`)
          setRestuarants(restuarants.filter(restuarant=>{
              return restuarant.id!==id
          }))
        } catch (err) {
            console.log(err);
        }
    };

    const handleUpdate=async (b,id)=>{
        b.stopPropagation()
        history.push(`/restuarants/${id}/update`);
    }

    const handleRestuarantSelect=(id)=>{
        history.push(`/restuarants/${id}`)
    }

    const renderRating=(restuarant)=>{
        if(!restuarant.count){
            return <span className="text-warning">0 reviews</span>
        }
       return <><StarRating rating={restuarant.id}/>
        <span className="text-warning ml-1">({restuarant.count})</span>
        </>
    }

    return (
        <div className="list">
            <table className="table table-hover table-dark">
                <thead >
                    <tr className="bg-primary">
                        <th scope="col">Restuarant</th>
                        <th scope="col">Location</th>
                        <th scope="col">Price Range</th>
                        <th scope="col">Ratings</th>
                        <th scope="col">Reviews</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {restuarants && restuarants.map(restuarant=>{
                        return(
                        <tr onClick={()=>handleRestuarantSelect(restuarant.id)} key={restuarant.id}>
                            <td>{restuarant.name}</td>
                            <td>{restuarant.location}</td>
                            <td>{"$".repeat(restuarant.price_range)}</td>
                            <td>{renderRating(restuarant)}</td>
                            <td>reviews </td>
                            <td><button onClick={(b)=>handleUpdate(b,restuarant.id)} className="btn btn-warning">Update</button></td>
                            <td><button onClick={(b) => handleDelete(b,restuarant.id)} className="btn btn-danger">Delete</button></td>
                        </tr>
                        )
                    })}
                    
                    {/* <tr>
                        <td>Papa Johns</td>
                        <td>Bulgurlu</td>
                        <td>$$$</td>
                        <td>Rating</td>
                        <td><button className="btn btn-info">Update</button></td>
                        <td><button className="btn btn-danger">Delete</button></td>
                    </tr>
                    <tr>
                        <td>Papa Johns</td>
                        <td>Bulgurlu</td>
                        <td>$$$</td>
                        <td>Rating</td>
                        <td><button className="btn btn-info">Update</button></td>
                        <td><button className="btn btn-danger">Delete</button></td>
                    </tr>
                    <tr>
                        <td>Papa Johns</td>
                        <td>Bulgurlu</td>
                        <td>$$$</td>
                        <td>Rating</td>
                        <td><button className="btn btn-info">Update</button></td>
                        <td><button className="btn btn-danger">Delete</button></td>
                    </tr> */}
                </tbody>
            </table>
        </div>
    )
}

export default RestuarantList
