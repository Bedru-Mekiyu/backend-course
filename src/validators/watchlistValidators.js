import {z} from 'zod';

export const addToWatchlistSchema= z.object({

    movieId: z.string().uuid(),
    status:z.enum(['PLANNED','WATCHING','COMPLETED','DROPPED'],{

        error: ()=>({
        message:'status must be on of: planned, watching,completed,dropped',
        }),
    }).optional(),
    rating:z.coerce.number()
    .int("rating must be an integer")
    .min(1,"rating must be between 1 and 10")
    .max(10,"rating must be between 1 and 10")
    .optional(),
    notes:z.string().optional(),

})