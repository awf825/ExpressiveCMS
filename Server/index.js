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

app.get("/admin/funnels/panes/:id", async function(req, res) {
	//queryString = `SELECT FROM panels WHERE panels.id = ${req.params.id}`
	const queryString = 'SELECT * FROM panels JOIN panels_fields pf ON panels.id = pf.panel_id JOIN panels_fields_options pfo ON pf.id = pfo.panel_field_id WHERE panels.id = '+req.params.id
	connection.query(queryString, (err, rows, fields) => {
		console.log(rows)
		if (err) throw err
		res.send({
			name:rows[0].name,
			ordering: rows[0].ordering,
			cta: rows[0].cta,
			type: rows[0].type,
			label: rows[0].label,
			fields: rows.map(r => {
				return {
					text: r.text,
					value: r.value
				}
			})
		})
	})
})

app.get("/admin/funnels/paneByOrdering", async function(req, res) {
	const queryString = 'SELECT * FROM panels JOIN panels_fields pf ON panels.id = pf.panel_id JOIN panels_fields_options pfo ON pf.id = pfo.panel_field_id WHERE panels.ordering = '+req.query.ordering
	console.log(queryString)
	connection.query(queryString, (err, rows, fields) => {
		console.log(rows)
		if (err) throw err
		res.send({
			name:rows[0].name,
			ordering: rows[0].ordering,
			cta: rows[0].cta,
			type: rows[0].type,
			label: rows[0].label,
			fields: rows.map(r => {
				return {
					text: r.text,
					value: r.value
				}
			})
		})
	})
})

app.listen(port, () => {
    console.log(`Server running on ${port}`);
})

// connection.end()