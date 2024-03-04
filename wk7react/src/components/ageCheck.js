import React from 'react';

function AgeCheck({colour}){
	
	const [age,result] = React.useState();
	
	return(
	<div style = {{backgroundColor :colour}}>
		<h2>Enter your age</h2>
		<input id="age" />
		<p id='result'></p>
		<input type='button' value='Check' onClick={updateStateAge} />
		</div>
	);
	
	function updateStateAge(){
		const age = document.getElementById('age').value;
		document.getElementById('result').innerHTML = 
		(age <= 17 ? `You are ${age} and you are not an adult` : `You are ${age} and you are an adult`);
	}
}

export default AgeCheck;