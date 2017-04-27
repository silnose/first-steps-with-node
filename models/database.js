//database
var cassandra = require("cassandra-driver");
var connection;
var db_config = {
    contactPoints: ['127.0.0.1'],
    keyspace: 'booklist'
};
connection = new cassandra.Client(db_config);
connection.connect(function (err, result) {
    console.log('cassandra connected');
});

module.exports = connection;
