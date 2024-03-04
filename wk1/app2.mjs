import express from 'express';
const app = express();


//Home or 'root' route
app.get('/', (req,res)=>{
	res.send('Second App');
});



//Start the server
app.listen(3001, () => {
	console.log("Server running on port 3000");
});

