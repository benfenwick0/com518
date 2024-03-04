import React from 'react';

let itemId = 1;

function ShoppingCart({store}){
	const [cart, setCart] = React.useState([]);
	
	const cartHtml = cart.map (item => <li key={item.id}>{item.name}</li>);
	
	return (
			<div>
			
			<h1>{store} Shopping Cart</h1>
			
			<div>
			<h2>Add something to your cart</h2>
			<fieldset>
			<input type='text' id='item' />
			<input type='button' value='GO!' onClick={addItem} />
			</fieldset>
			</div>
			
			Here is your shopping cart:
			<ul>
			{cartHtml}
			</ul>
			
			</div>
		);
		
	function addItem(){
		const items = structuredClone(cart);
		const newItem = {
			id: itemId++,
			name: document.getElementById('item').value
		};
		items.push(newItem);
		setCart(items);
	}
}

export default ShoppingCart;