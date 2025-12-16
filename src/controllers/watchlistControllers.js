// src/controllers/watchlistControllers.js
import { prisma } from "../config/db.js";

export const addToWatchlist = async (req, res) => {
  const { movieId, status, rating, notes } = req.body;
  const userId = req.user.id; // from token

  // 1) verify movie existence
  const movie = await prisma.movie.findUnique({
    where: { id: movieId },
  });

  if (!movie) {
    return res.status(404).json({ error: "movie not found" });
  }

  // 2) check already in watchlist for this user + movie
  // If you have @@unique([userId, movieId], name: "userId_movieId")
  // you can use findUnique with userId_movieId. Otherwise, use findFirst:
  const existingInWatchlist = await prisma.watchlistItem.findFirst({
    where: { userId, movieId },
  });

  if (existingInWatchlist) {
    return res
      .status(400)
      .json({ error: "movie already exists in watchlist" });
  }

  // 3) create watchlist item
  const watchlistItem = await prisma.watchlistItem.create({
    data: {
      userId,
      movieId,
      status: status || "PLANNED",
      rating,
      notes,
    },
  });

  res.status(201).json({
    status: "success",
    data: { watchlistItem },
  });
};

export const removeFromWatchlist = async (req, res) => {
  const watchlistItem = await prisma.watchlistItem.findUnique({
    where: { id: req.params.id },
  });

  if (!watchlistItem) {
    return res.status(404).json({ error: "watchlist item not found" });
  }

  // ✅ correct ownership check
  if (watchlistItem.userId !== req.user.id) {
    return res
      .status(403)
      .json({ error: "not allowed to update this watchlist item" });
  }

  await prisma.watchlistItem.delete({
    where: { id: req.params.id },
  });

  res.status(200).json({
    status: "success",
    message: "movie delete successfully",
  });
};

export const updateWatchlistItem=async (req,res)=>{


    const watchlistItem=await prisma.watchlistItem.findUnique({
        where:{id: req.params.id},
    });

    if(!watchlistItem){
        return res.status(404).json({error:"watchlist item not found"});

    }

    if(watchlistItem.userId !== req.user.id){
        return res.status(403).jso({
            error:"not allowed to update this watchlist item"
        });
    }
    const updateData={};
    if(status !==undefined) updateData.status=status.toUpperCase();
    if(rating !==undefined) updateData.rating=rating.toUpperCase();
    if(notes !==undefined) updateData.notes=notes.toUpperCase();
    
};