import { prisma } from "../config/db.js";

export const addToWatchlist= async (req,res)=>{
    const {movieId,status,rating,notes,userId}=req.body;
    
    //verify movie existance

    const movie= await prisma.movie.findUnique({
        where:{id:movieId},
    });

    if(!movie){
        return res.status(404).json({error:"movie not found"});
    }

    //check it aready in check list 

    
    const existingInWatchlist= await prisma.watchlistItem.findUnique({
        where:{userId_movieId:
            {
                userId:userId,
                movieId:movieId
            }
        }
    });
    if(existingInWatchlist){
        return res.status(400).json({error:'movie aready exit in watchlist'})
    }

    const watchlistItem= await prisma.watchlistItem.create({
        data:{
            userId,
            movieId,
            status:status ||  "PLANNED",
            rating,
            notes,
        }
    });
    res.status(201).json({
        status:'success',
        data:{
            watchlistItem,
        }
    })
}
