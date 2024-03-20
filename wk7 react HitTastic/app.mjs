import express from 'express';
import Database from 'better-sqlite3';

const app = express();
const db = new Database("wadsongs.db")
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

app.get('/artist/:artist', (req,res) =>{
	try {
		const stmt = db.prepare('SELECT * FROM wadsongs WHERE artist=?');
		const results = stmt.all(req.params.artist);
		res.json(results);	
	} catch(error){
		res.status(500).json({error: error});
	}
});



app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
});
