
//Import conexion data
var connection = require('./database');

var books = {};

/**
 * Get All Book
 */
books.all = function (callback) {

    var data = {
        'error': '',
        'Books': '',
    };

    var query = 'SELECT * from books';
    connection.execute(query, function (err, rows) {
        if (err) {
            data['error'] = err.stack.split("\n", 1);
        }
        else {
            if (rows.length != 0) {
                data['Books'] = rows;
            } else {
                data['Books'] = 'No books Found..';
            }
        }
        callback(data);
    });
}


/**
 * Get Book By ID
 */

books.findById = function (id, callback) {

    var data = {
        'error': '',
        'Books': '',
    };

    var query = "SELECT * FROM books WHERE id ='" + id + "'";

    connection.execute(query, function (err, rows) {

        console.log(rows);
        if (err) {
            data['error'] = err.stack.split("\n", 1);
        }
        else {
            if (rows.length != 0) {
                data['Books'] = rows;
            } else {
                data['Books'] = 'No books Found..';
            }
        }
        callback(rows);
    });


}

/**
 * Insert Book By ID
 */

books.add = function (book, callback) {
    var result = {
        'error': '',
        'Books': '',
    };
    var query = 'INSERT INTO books(id,authorname,bookname,price) VALUES (?,?,?,?)';
    var params = book;
    console.log(params)

    connection.execute(query, params, function (err) {
        console.log(err);

        if (!!err) {
            result['error'] = 'Error Adding data.' + err.stack.split("\n", 1);
        } else {
            result['Books'] = 'Book Added Successfully';
        }
        callback(result);

    });


}


/**
 * EDIT Book By ID
 */

books.update = function (book, callback) {
    var data = {
        'error': '',
        'Books': '',
    };

    var update = 'UPDATE books SET bookname=?, authorname=?, price=? WHERE id=?';
    var params = book;
    connection.execute(update, params, function (err) {
        if (!!err) {
            data['error'] = 'Error Updating data' + err.stack.split("\n", 1);
        } else {
            data['Books'] = 'Updated Book Successfully';
        }
        callback(data);
    });

}

/**
 * DELETE Book By ID
 */

books.delete = function (id, callback) {

    var data = {
        'error ': '',
        'Books ': ' '
    };
    if (!!id) {
        var query = 'DELETE FROM books WHERE id=? ';
        var params = [id]
        connection.execute(query, params, function (err) {
            if (!!err) {
                data['Books '] = 'Error deleting data ';
            } else {
                data['error '] = "";
                data['Books '] = 'Delete Book Successfully ';
            }
            callback(data);
        });
    } else {
        data['Books '] = 'Please provide all required data (i.e : id ) ';

    }


}


module.exports = books;
