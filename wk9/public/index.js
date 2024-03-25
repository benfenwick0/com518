/*
 * PLEASE NOTE:
 *
 * You can use this code to compare with your lab exercise answer.
 *
 * However this code, or code derived from it, MUST NOT be used in the assignment.
 */



// Handle button clicks on the search button
document.getElementById("ht_search").addEventListener("click", e=> {

    // Read in the artist from the form field
    const artist = document.getElementById("ht_artist").value;
    ajaxSearch(artist);
});

async function ajaxSearch(artist) {

    // Send a fetch request to the artist route on this server, passing the
    // artist as a parameter
    const ajaxResponse = await fetch(`/artist/${artist}`);

    // Parse the JSON
    const songs = await ajaxResponse.json();

    // Loop through each song in the JSON
    let html = "";
    songs.forEach( song => {
        // Format the HTML output, using the fields from the current song
        html += `${song.title} by ${song.artist}, year ${song.year}<br />`;
		
		//Create the paragraph
		let paragraph = document.createElement('p');
		//Set the innerHTML of the paragraph to the song details
		//paragraph.innerHTML = `${song.title} by ${song.artist}, year ${song.year}<br />`;
				

		const textNode = document.createTextNode(`${song.title} by ${song.artist}, year ${song.year}`);
		
		
		//Add the parahraph to the <div>
		document.getElementById("ht_results").appendChild(paragraph);
		
		paragraph.appendChild(textNode);
		
		
		//Create 'buy' button
		const buttonElement = document.createElement("input");
		buttonElement.setAttribute("type","button");
		buttonElement.setAttribute("value", "Buy!");
		buttonElement.addEventListener ("click", async(e)=>{
			
			try{
				const response = await fetch(`/song/${song.id}/buy`,{
					method: 'POST'
				});	
				
				if(response.status == 200) {
					alert("Successfully bought");
				} else if (response.status == 404) {
					alert("No song with ID");
				} else if (response.status == 401) {
                    alert("User not logged in");
                } else {
					alert(`Unknown error: code ${response.status}`);
				}
			} 
			catch(e) {
				alert(`Error: ${e}`);
			}
		
		});
		paragraph.appendChild(buttonElement);
    });

    
}


// Add a song
document.getElementById("ht_add").addEventListener("click", async() => {

    // Create an object containing the details from the form
    const song = {
        "title": document.getElementById("new_title").value,
        "artist": document.getElementById("new_artist").value,
        "year": document.getElementById("new_year").value,
        "quantity": document.getElementById("new_quantity").value,
        "price": document.getElementById("new_price").value
    };

    try {

        // Send an AJAX post request to the server, with the song in the body
        const response = await fetch('/song/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(song)
        });    

        // Handle the status returned from the server
        if(response.status == 200) {
            alert("Successfully added");
        } else if (response.status == 400) {
            alert("Blank fields");
        } else {
            alert(`Unknown error: code ${response.status}`);
        }
    } catch(e) {
        alert(`Error: ${e}`);
    }
});



const loginStatus = async()=>{
    try{
        const response = await fetch('/users/login');
        const data = await response.json();

        if (data.username == null){//not logged in
            document.getElementById("buttonlogout").style.display = 'none';
            document.getElementById("login_form").style.display = 'block';
            document.getElementById("loggedInMessageFillerText").innerHTML = "";
            document.getElementById("searchForm").style.display = 'none';
        }
        else{//logged in user
            document.getElementById("loggedInMessageFillerText").innerHTML = `Logged in as ${data.username}`;
            document.getElementById("loggedInMessage").style.display = 'block';
            document.getElementById("login_form").style.display = 'none';
            document.getElementById("buttonlogout").style.display = 'block';
            document.getElementById("searchForm").style.display = 'block';
        }
    } catch (e){
        alert(`Error: ${e}`);
    }
}


loginStatus();


document.getElementById("loginButton").addEventListener("click", async ()=>{
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try{
        const response = await fetch('/users/login',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        });

        if (response.status ==200){
            const user = await response.json();
            document.getElementById("loggedInMessageFillerText").innerHTML = `Logged in as ${user.username}`;
            document.getElementById("loggedInMessage").style.display = 'block';
            document.getElementById("login_form").style.display = 'none';
            document.getElementById("buttonlogout").style.display = 'block';
            document.getElementById("searchForm").style.display = 'block';
            alert('Logged in successfully')
        }
        else{
            alert('Login failed. Please enter credentials again.')
        }
    }catch(error){
        alert(`Error: ${e}`);
    }

});

document.getElementById("logoutButton").addEventListener("click", async ()=>{
    try{
        const response = await fetch('/users/logout',{
            method: 'POST',
        });

        if (response.status ==200){
            alert('Logged out successfully');
            document.getElementById("buttonlogout").style.display = 'none';
            document.getElementById("login_form").style.display = 'block';
            document.getElementById("loggedInMessageFillerText").innerHTML = "";
            document.getElementById("searchForm").style.display = 'none';

        }
        else{
            alert('Login failed. Please enter credentials again.')
        }
    }catch(error){
        alert(`Error: ${e}`);
    }

});

