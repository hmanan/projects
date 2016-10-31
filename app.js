/**
 * Created by Harnoor Singh 10/30/2016.
 */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// put,post on server
app.use(bodyParser.json());

// connection with db
Genre = require('./models/genre');
Book = require('./models/book');

// Connecting to Mongoose
mongoose.connect('mongodb://localhost/bookstore');
var db = mongoose.connection;

// main page message
app.get('/', function(req, res){
    res.send('Please use /api/books or /api/genres');
});

// get genre
app.get('/api/genres', function(req, res){
    Genre.getGenres(function(err, genres){
       if(err){
           throw err;
       }
        res.json(genres);
    });

});

// Add genre
app.post('/api/genres', function(req, res){
    var genre = req.body;
    Genre.addGenre(genre, function(err, genre){
        if(err){
            throw err;
        }
        res.json(genre);
    });

});

// Delete book
app.delete('/api/genres/:_id', function(req, res){
    var id = req.params._id;
    Genre.removeGenre(id, function(err, genre){
        if(err){
            throw err;
        }
        res.json(genre);
    });

});

// Get all books
app.get('/api/books', function(req, res){
    Book.getBooks(function(err, books){
        if(err){
            throw err;
        }
        res.json(books);
    });

});

// Get a book by Id
app.get('/api/books/:_id', function(req, res){
    Book.getBookById(req.params._id, function(err, book ){
        if(err){
            throw err;
        }
        res.json(book);
    });

});

// Change book
app.post('/api/books', function(req, res){
    var book = req.body;
    Book.addBook(book, function(err, book){
        if(err){
            throw err;
        }
        res.json(book);
    });

});

// Change genre
app.put('/api/genres/:_id', function(req, res){
    var id = req.params._id;
    var genre = req.body;
    Genre.updateGenre(id, genre, {}, function(err, genre){
        if(err){
            throw err;
        }
        res.json(genre);
    });

});

// Add Book
app.put('/api/books/:_id', function(req, res){
    var id = req.params._id;
    var book = req.body;
    Book.updateBook(id, book, {}, function(err, book){
        if(err){
            throw err;
        }
        res.json(book);
    });

});

// Delete Book
app.delete('/api/books/:_id', function(req, res){
    var id = req.params._id;
    Book.removeBook(id, function(err, book){
        if(err){
            throw err;
        }
        res.json(book);
    });

});

// server call
app.listen(3000);
console.log('Running on port 3000...');
