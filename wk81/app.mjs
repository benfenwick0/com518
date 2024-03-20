// Solution to the standard exercises for week 2

/*
 * PLEASE NOTE:
 *
 * You can use this code to compare with your lab exercise answer.
 *
 * However this code, or code derived from it, MUST NOT be used in the assignment.
 */

// Import dependencies
import express from 'express';
import Database from 'better-sqlite3';
import expressSession from 'express-session';
import betterSqlite3Session from 'express-session-better-sqlite3';

// Create our Express server.
const app = express();

// Enable reading JSON from the request body of POST requests
app.use(express.json());

// Access static content in the 'public' folder
app.use(express.static('public'));

// Load the database. You may need to change the path.
const db = new Database("wadsongs.db");
const SqliteStore = betterSqlite3Session(expressSession, db);

app.use(expressSession({
    // Specify the session store to be used.
    store: new SqliteStore(), 

    // a secret used to digitally sign session cookie, use something unguessable (e.g. random bytes as hex) in a real application.
    secret: 'BinnieAndClyde', 

    // regenerate session on each request (keeping the session active)
    resave: true, 

    // save session to store before data is stored in it (disabled as this unnecessarily creates empty sessions)
    saveUninitialized: false, 

    // reset cookie for every HTTP response. The cookie expiration time will be reset, to 'maxAge' milliseconds beyond the time of the response. 
    // Thus, the session cookie will expire after 10 mins of *inactivity* (no HTTP request made and consequently no response sent) when 'rolling' is true.
    // If 'rolling' is false, the session cookie would expire after 10 minutes even if the user was interacting with the site, which would be very
    // annoying - so true is the sensible setting.
    rolling: true, 

    // destroy session (remove it from the data store) when it is set to null, deleted etc
    unset: 'destroy', 

    // useful if using a proxy to access your server, as you will probably be doing in a production environment: this allows the session cookie to pass through the proxy
    proxy: true, 

    // properties of session cookie
    cookie: { 
        maxAge: 600000, // 600000 ms = 10 mins expiry time
        httpOnly: false // allow client-side code to access the cookie, otherwise it's kept to the HTTP messages
    }
}));


// Search by artist
app.get('/artist/:artist', (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM wadsongs WHERE artist=?');
        const results = stmt.all(req.params.artist);
        res.json(results);
    } catch(error) {
        res.status(500).json({error: error});
    }
});

// Search by title
app.get('/title/:title', (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM wadsongs WHERE title=?');
        const results = stmt.all(req.params.title);
        res.json(results);
    } catch(error) {
        res.status(500).json({error: error});
    }
});

// Search by title and artist
app.get('/artist/:artist/title/:title', (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM wadsongs WHERE title=? AND artist=?');
        const results = stmt.all(req.params.title, req.params.artist);
        res.json(results);
    } catch(error) {
        res.status(500).json({error: error});
    }
});

// Buy a song with a given ID
app.post('/song/:id/buy', (req, res) => {
    try {
        const stmt = db.prepare('UPDATE wadsongs SET quantity=quantity-1 WHERE id=?');
        const info = stmt.run(req.params.id);
        if(info.changes == 1) {
            res.json({success: 1});
        } else {
            res.status(404).json({error: "No song with that ID"});
        }
    } catch(error) {
        res.status(500).json({error: error});
    }
});

// Delete a song with a given ID
app.delete('/song/:id', (req, res) => {
    try {
        if(!req.session || !req.session.username){
            res.status(401).json({error: "Unauthorized: No user logged in"});
        } else{
        const stmt = db.prepare('DELETE FROM wadsongs WHERE id=?');
        const info = stmt.run(req.params.id);
        if(info.changes == 1) {
            res.json({success: 1});
        } else {
            res.status(404).json({error: "No song with that ID"});
        }
        }
    } catch(error) {
        res.status(500).json({error: error});
    }
});

// Add a song
app.post('/song/create', (req, res) => {
    try {
        if(req.body.title == "" || req.body.artist == "" || req.body.year == "" || req.body.price == "" || req.body.quantity == "") {
            res.status(400).json({error: "Blank fields"});
        } else {
            const stmt = db.prepare('INSERT INTO wadsongs(title,artist,year,downloads,price,quantity) VALUES(?,?,?,0,?,?)');
            const info = stmt.run(req.body.title, req.body.artist, req.body.year, req.body.price, req.body.quantity);
            res.json({id: info.lastInsertRowid});
        }
    } catch(error) {
        res.status(500).json({error: error});
    }
});


app.use((req,res,next)=>{
	console.log("Session is");
	console.log(req.session);
	next();
});

//Login POST 
app.post('/login', (req,res)=>{
	
	const stmt = db.prepare('SELECT * FROM ht_users WHERE username=? and password=?')
	const results = stmt.all(req.body.username, req.body.password);
	
	if(results.length == 1){
		req.session.username = results[0].username;
		res.json({"username": req.body.username});
	//if(req.body.username == 'SimonSmith' && req.body.password == 'secret'){
	//	req.session.username = req.body.username;
	//	res.json({success: 1)};
	//}
	} else{
		res.status(401).json({error: "Incorrect login!"});
	}
	
});

//Login GET
app.get('/login', (req,res)=>{
	res.json({username: req.session.username || null});
});

//Logout POST route
app.post('/logout', (req,res)=>{
	req.session = null;
	res.json({'success': 1});
});

app.listen(3000);