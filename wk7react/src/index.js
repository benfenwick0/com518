import React from 'react';
import ReactDOM from 'react-dom/client';
import Greeting from './components/greeting.js';
import InteractiveGreeting from './components/interactivegreeting.js';
import InteractiveGreeting2 from './components/interactivegreeting2.js';
import ShoppingCart from './components/shoppingcart.js';
import AgeCheck from './components/ageCheck.js';



const root = ReactDOM.createRoot(document.getElementById('root'));
//root.render(<h1>Hello World!</h1>);


//root.render(<Greeting firstname='Ben' age ='22' />)

//root.render(<ShoppingCart />);

root.render(<AgeCheck colour = 'yellow' />);