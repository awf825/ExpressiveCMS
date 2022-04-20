const express = require('express');
// const http = require('http'); 
const bodyParser = require('body-parser');
// const router = require('./router.js');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const port = 3200;

// const MongoUrl = process.env.MONGODB_URL;

try {
	// mongoose.connect( url, {useNewUrlParser: true, useUnifiedTopology: true }); 
	mongoose.connect( MongoUrl, { useNewUrlParser: true }); 

	const connection = mongoose.connection;

	connection.once("open", function() {
	  console.log("MongoDB database connection established successfully");
	});
} catch (error) { 
	console.log("could not connect, error:", error);    
}

const allowedOrigins = [
	'http://localhost:3000'
]

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
    res.send({ "message": "bigjoe" })
})

app.listen(port, () => {
    console.log(`Server running on ${port}`);
})