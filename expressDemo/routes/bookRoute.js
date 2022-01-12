const express = require('express');

const mongoose = require('mongoose');
const bookSchema = require('../schemas/bookSchema');
const checkLogin = require('../middlewares/checkLogin');
const bookRouter = express.Router();
const BookSchema = new mongoose.model("Book", bookSchema);

let books =[];


bookRouter.get('/', async (req,res) => {
    res.send('Welcome to our Library!!');
});

bookRouter.get('/getAllBooks',(req,res) => {
    BookSchema.find({}, (err,data) => {
        if(err){
            res.status(500).json({
                error: "There was a server side error while getting all the books",
            });
        }else {
            res.send(data);
        }
    })
});

bookRouter.post('/postBooks', (req,res) => {
   
    const newBook = new BookSchema(req.body);
     newBook.save((err) => {
        if(err){
            res.status(500).json({
                error: "There was a server side error while adding a book",
            });
        }else {
            res.status(200).json({
                message: "Book was added successfully",
            });
        }
    });

});

bookRouter.put('/editedBooks/:isbn', (req,res) => {
    BookSchema.updateOne({ISBN: req.params.isbn}, {
        $set: {
            book_name : req.body.book_name,
            author : req.body.author,
            price: req.body.price
        }
      }, (err) => {
        if(err){
            res.status(500).json({
                error: "There was a server side error while updating a book",
            });
        }else {
            res.status(200).json({
                message: "Book was updated successfully",
            });
        }
    })
});

bookRouter.delete('/deleteBook/:isbn', (req,res) => {
    BookSchema.deleteOne({ISBN: req.params.isbn}, (err) => {
        if(err){
            res.status(500).json({
                error: "There was a server side error while deleting a book",
            });
        }else {
            res.status(200).json({
                message: "Book was deleted successfully",
            });
        }
    })
});

module.exports = bookRouter;