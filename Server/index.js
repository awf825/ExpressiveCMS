const express = require('express');
// const http = require('http'); 
const bodyParser = require('body-parser');
// const router = require('./router.js');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const port = 3200;

const mysql = require('mysql')
const connection = mysql.createConnection({
  host: "localhost",
  user: "user",
  password: "password",
  port: 8889,
  database: "expressive-cms"
})

connection.connect()

const allowedOrigins = [ 'http://localhost:3000' ];

app.use(cors({
	origin: function(origin, callback) {
		// allow requests with no origin (like mobile apps or curl requests)
	    if(!origin) return callback(null, true);

	    if(allowedOrigins.indexOf(origin) === -1) {
	    	var msg = 'The CORS policy for this site does not allow access from the specified origin.';
	    	return callback(new Error(msg), false);
	    }
	    return callback(null, true);
	}
}));

app.use(bodyParser.json({ type: '*/*' }));

app.get("/", async function(req, res) {
	connection.query('SELECT * FROM content', (err, rows, fields) => {
		if (err) throw err
		r = rows[0] 
		res.send({ 
			"author": r.author,
			"title": r.title,
			"content": r.content
		})
	})
})

app.listen(port, () => {
    console.log(`Server running on ${port}`);
})

// connection.end()