import express from 'express';
const app = express();


import Database from 'better-sqlite3';
const db = new Database('wadsongs.db');





//Home or 'root' route
app.get('/', (req,res)=>{
	res.send('Hello World from Express');
});




app.get('/students/:lastname', (req, res) => {
	try{
		const stmt = db.prepare("SELECT * FROM students WHERE lastname=?");
		const results = stmt.all(req.params.lastname);
		res.json(results);		
	}
	catch(error){
		res.status(500).json({error: error});
	}
	
});


app.get('/artist/:artist', (req, res) => {
	try{
		const stmt = db.prepare("SELECT * FROM wadsongs WHERE artist=?");
		const results = stmt.all(req.params.artist);
		res.json(results);		
	}
	catch(error){
		res.status(500).json({error: error});
	}
	
});


app.get('/artist/title/:title', (req, res) => {
	try{
		const stmt = db.prepare("SELECT * FROM wadsongs WHERE title=?");
		const results = stmt.all(req.params.title);
		res.json(results);		
	}
	catch(error){
		res.status(500).json({error: error});
	}
	
});


//'Time' Route
app.get('/time', (req,res)=>{
	res.send(`There have been ${Date.now()} milliseconds since 1/1/70`);

});


app.get('/greet/:user', (req,res)=>{
	const user = req.params.user;
	res.send(`Hello ${user}`);
});

//Start the server
app.listen(3000, () => {
	console.log("Server running on port 3000");
});

