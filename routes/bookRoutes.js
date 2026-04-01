const express = require('express');
const router = express.Router();
const dao = require('../dao/bookDAO');

router.get('/', async (req , res) => {
    try{
        const { genre } = req.query;

        const books = genre 
            ? await dao.getBooksByGenre(genre) 
            : await dao.getAllBooks();
        res.json({total: books.length, books}); 
    } catch (err) {
        res.status(500).json({error: 'Failed to fetch books'});
    }
});

router.get('/:id', async (req, res) =>{
    try{
        const book = await dao.getBookById(req.params.id);
        if(!book){
            return res.status(404).json({ error: 'Book not found'});
        }
        res.json(book);
    } catch (err){
        res.status( 500 ).json({error: 'Failed to fetch book'});
    }
});

router.post('/', async (req, res) => {
    try{
        const { title, author, genre, price, stock } = req.body;
        if(!title || !author || !price){
            return res.status(400).json({ error: 'title, author and price are required' });
        }
        if(price < 0) {
            return res.status(400).json({error: 'price cannot be negative'});
        }
        const newBook = await dao.createBook({title, author, genre, price, stock});

        return res.status(201).json(newBook); 
    } catch (err) {
        res.status(500).json({error: 'Failed to create book'});
    }
});

router.put('/:id', async (req, res) => {
    try{
        const {title, author, genre, price, stock} = req.body;
        if(!title || !author || !price){
            return res.status(400).json({ error: 'title, author and price are required' });
        }
        if(price < 0) {
            return res.status(400).json({error: 'price cannot be negative'});
        }
        const affected = await dao.updateBook(req.params.id, {title, author, genre, price,stock});
        if(!affected){
            res.json(404).json({error: 'Book not found'});
        }
        res.json({message: 'Book updated successfully'});
    } catch(err){
        res.status(500).json({ error: 'Failed to update book' });
    }
});

router.delete('/:id', async (req, res) => {
    try{
        const affected = await dao.deleteBook(req.params.id);

        if(!affected){
            return res.status(404).json({error: 'Book not found'});
        }
        return res.json({message: 'Book deleted successfully'});
    } catch (err) {
        return res.status(500).json({error: 'Failed to delete book'});
    }
});

router.patch('/:id', async (req, res) => {
    try{
        const {stock} = req.body;
        if(stock === undefined || stock < 0){
            return res.status(400).json({error: 'Valid stock value is required'});
        }
        const affected = await dao.updateStock(req.params.id, stock);
        if(!affected){
            return res.status(404).json({ error: 'Book not found' });
        }
        return res.json({message: 'Stock updated successfully'});
    } catch (err) {
        return res.status(500).json({error: 'Failed to update stock'});
    }
});

module.exports = router;