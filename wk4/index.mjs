import express from 'express';
const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs')

//Home or 'root' route
app.get('/', (req,res)=>{
	res.render('home');
});

//Start the server
app.listen(3000, () => {
	console.log("Server running on port 3000");
});
