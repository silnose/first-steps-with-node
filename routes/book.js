var express = require('express')
    , router = express.Router()
    , Books = require('../models/book')


/**
 * Get All Book
 */
router.get('/', function (req, res) {

    Books.all(function (data) {
        res.status(200).json(data);

    });
});


/**
 * Get Book
 */
router.get('/:id', function (request, response) {
    var id = request.params.id;
    Books.findById(id, function (data) {

        console.log(data);
        response.status(200).json(data);

    });
});


/**
 * Insert Book
 */
router.post('/add', function (request, response) {
    var body = request.body;
    var id = "12";
    var bookname = body.bookname;
    var authorname = body.authorname;
    var price = body.price;


    var book = { id, bookname, authorname, price };

    Books.add(book, function (data) {


        response.status(200).json(data);

    });
});



/**
 * Update Book
 */

router.put('/update/:id', function (request, response) {
    var body = request.body;
    var id = request.params.id;
    var bookname = body.bookname;
    var authorname = body.authorname;
    var price = body.price;


    var book = { bookname, authorname, price, id };

    Books.update(book, function (data) {


        response.status(200).json(data);

    });
});


/**
 * Delete Book
 */

router.delete('/delete/:id', function (request, response) {
    var id = request.params.id;
    Books.delete(id, function (data) {

        console.log(data);
        response.status(200).json(data);

    });
});


module.exports = router