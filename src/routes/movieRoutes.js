
import express from 'express';
const router = express.Router();

// Sample route to get a list of movies
router.get('/', (req, res) => {
    res.json({ method: 'GET', message: 'Hello from movieRoutes!' });

});
router.post('/', (req, res) => {
    res.json({ method: 'POST', message: 'Movie created!' });
});
router.put('/', (req, res) => {
    res.json({ method: 'PUT', message: `Movie with ID ${req.params.id} updated!` });
});
router.delete('/', (req, res) => {
    res.json({ method: 'DELETE', message: `Movie with ID ${req.params.id} deleted!` });
}); 

export default router;