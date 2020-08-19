require("dotenv").config();
const morgan=require("morgan");
const cors=require('cors');
const express=require('express');
const db=require("./db");
const app=express();

app.use(cors());

app.use(express.json())

//Get all Restuarants

app.get("/api/v1/restuarants",async (req,res)=>{
    try {
        // const results=await db.query("select * from restuarants")
        const restuarantRatingData=await db.query(
            "select * from restuarants left join (select restuarant_id,COUNT(*),TRUNC(AVG(rating),1) as average_rating from reviews group by restuarant_id) reviews on restuarants.id=reviews.restuarant_id;"
        );
        // console.log("results",results);
        // console.log("restuarant data ",restuarantRatingData);
        // console.log(results);
        res.status(200).json({
        status:"success",
        results:restuarantRatingData.rows.length,
        data:{
            restuarants:restuarantRatingData.rows
        },
        
    });
    } catch (err) {
        console.log(err);
    }
   
    
});


//Get a restuarant
app.get("/api/v1/restuarants/:id",async (req,res)=>{
    console.log(req.params.id);
    try {
        const restuarant= await db.query("select * from restuarants left join (select restuarant_id,COUNT(*),TRUNC(AVG(rating),1) as average_rating from reviews group by restuarant_id) reviews on restuarants.id=reviews.restuarant_id where id=$1",[req.params.id]);
        //select * from restuarants where id = req.params.id
        const reviews= await db.query("select * from reviews where  restuarant_id=$1",[req.params.id]);
        console.log(reviews);
        res.status(200).json({
            status:"success",
            data:{
                restuarant:restuarant.rows[0],
                reviews:reviews.rows
            },
        });
        // console.log(results.rows[0]);
    }
    
    catch (err) {
        console.log(err);
    }
    
    // res.status(200).json({
    //     status:"success",
    //     data:{
    //         restuarants:results.rows[0],
    //     }
    // })
    
});



//Create a Restuarant
app.post("/api/v1/restuarants",async (req,res)=>{
    // console.log(req.body);
    try {
        const results=await db.query("INSERT INTO restuarants (name,location,price_range) values ($1,$2,$3) returning *",[req.body.name,req.body.location,req.body.price_range])
        console.log(results);
        res.status(201).json({
            status:"success",
            data:{
                restuarant:results.rows[0],
            }
        })
    } catch (err) {
        console.log(err);
    }
    
  
});

//Update Restuarants

app.put("/api/v1/restuarants/:id",async (req,res)=>{

    try {
        const results=await db.query("UPDATE restuarants SET name=$1,location=$2,price_range=$3 where id=$4 returning *",[req.body.name,req.body.location,req.body.price_range,req.params.id])
        console.log(results);
        res.status(200).json({
            status:"success",
            data:{
                restuarant:results.rows[0]
            }
        })
    } catch (err) {
        console.log(err);
    }
    console.log(req.params.id);
    console.log(req.body);
    
})

//Delete Restuarant

app.delete("/api/v1/restuarants/:id",async (req,res)=>{
    try {
        const results=db.query("DELETE FROM restuarants where id=$1",[req.params.id])
        res.status(204).json({
            status:"success"
        })
    } catch (err) {
        console.log(err);
    }
    
})


app.post("/api/v1/restuarants/:id/addReview", async (req,res)=>{
    try {
 const newReview= await  db.query("INSERT INTO reviews (restuarant_id,name,review,rating) values ($1,$2,$3,$4);",[req.params.id,req.body.name,req.body.review,req.body.rating])
    console.log(newReview);
    res.status(201).json({
        status:'success',
        data:{
            review:newReview.rows[0]
        }
    })
    } catch (err) {
        console.log(err);
    }
})



const port=process.env.PORT || 3500;


app.listen(port,()=>{
    console.log(`server is on port ${port}`);
});