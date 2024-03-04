import React from 'react';


function Greeting({firstname, age}){
	//return <h1>Hello from the Greeting Componenet!</h1>;
	//return <p> Hello {props.firstname} {props.lastname}!</p>;
	return <p> Hello {firstname}, your age is {age}!</p>;
}

export default Greeting;