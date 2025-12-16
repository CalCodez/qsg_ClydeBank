//ClydeBank CoffeeShop
//Copyright (C) 2004 ClydeBank Media, All Right reserves.
//Written by Robert W. Oliver II, Author of JavaScript QuickStart Guide

//The locale and currency to use for formatting
const locale = 'en-Us';
const currency = 'USD';

//Menu structure
const menuLinks = {
	Home: 'index.html',
	About: 'index.html',
	Contact: 'index.html',
};

//Our inventory
const inventory = {
	'Regular Coffee': 3.0,
	Espresso: 3.5,
	Latte: 4.25,
};

/*Random number to add to the end of IDs tht aren't
specified to prevent collisions. Only one per page load is needed
*/
const randomIdPostFix = Math.floor(Math.random() * 100000);

//This object is used here to format currency
const intlFormat = new Intl.NumberFormat(locale, {
	style: 'currency',
	currency: currency,
});

//Retrieve a cookie by name
function getCookie(name) {
	//Add the equal sign to the name (name=)
	let cookieName = name + '=';

	//Decide cookie string to handle cookies with special characters
	let decodedCookie = decodeURIComponent(document.cookie);

	//Check if there are any cookies to process
	if (!decodedCookie) {
		return null;
	}
	//Split document.cookie on on semicolons into an array
	let cookieArray = decodedCookie.split(';');

	//Iterate through the name=value pairs i the cookieArray
	for (let i = 0; i < cookieArray.length; i++) {
		let cookie = cookieArray[i];

		//Remove any leading spaces
		cookie = cookie.replace(/^\s+/, '');
		// cookie = cookie.trim();

		//If cookie is found, return its value
		if (cookie.indexOf(cookieName) === 0) {
			return cookie.substring(cookieName.length, cookie.length);
		}
	}
	return null;
}

//Function that uses Regex(blah)
function replaceNonAlphanumericWithDashes(input) {
	//Regular expression to match spaces and non-alphanumeric characters
	let regex = /[^a-zA-Z0-9]+/g;

	//Replace matches with dashes
	let output = input.replace(regex, '-');

	return output;
}

//Obtain the cart and return it as JSON
function getCart() {
	//Retrieve the "cart" cookie
	let cartCookie = getCookie('cart');

	if (cartCookie) {
		//If it exist, parse contents and return the result,
		return JSON.parse(cartCookie);
	} else {
		//otherwise return an empty object
		return {};
	}
}

function saveCart(cart) {
	//Save the updated cart back to the cookie
	document.cookie = 'cart=' + encodeURIComponent(JSON.stringify(cart));
}

//Add an item to the cart
function addToCart(itemName, itemPrice, itemQuantity) {
	//Load the existing cart from the cookie (if it exists) otherwise loads empty
	let cart = {};

	if (document.cookie) {
		cart = JSON.parse(document.cookie.replace('cart=', ''));
	}
	//This strips 'cart=stringifiedJSON' into 'stringifiedJSON' then parses that and assigns it to the cart object

	//Crate an object with the name, price, and quantity to add
	const item = {
		name: itemName,
		price: itemPrice,
		quantity: itemQuantity,
	};

	//If a cart item with the same name exists, increment quantity. Otherwise add item.
	if (cart[itemName]) {
		cart[itemName].quantity += itemQuantity;
	} else {
		cart[itemName] = item;
	}

	//Log to console for diagnostic purposes
	console.log(`Added` + JSON.stringify(item) + ` to cart!`);

	//Sae the cart back to the cookie
	saveCart(cart);
}

//Remove item from cart
function removeFromCart(itemName) {
	//Retrieve then 'cart' cookie

	let cartCookie = getCookie('cart');

	if (cartCookie) {
		let cart = JSON.parse(cartCookie);
		if (cart[itemName]) {
			delete cart[itemName];

			//Save the update cart back to the cookie
			saveCart(cart);
		}
	}
}

//Define a button prototype
const buttonPrototype = {
	id: 'button' + randomIdPostFix,
	text: 'Click Me',
	color: '#cad317',
	borderStyle: '1px solid #3b1c0b',
	clickEvent: false,
	className: '',

	render: function (parent) {
		let { id, text, color, borderStyle, clickEvent, className } = this;

		let button = document.createElement('button');
		button.id = id;
		button.textContent = text;
		button.style.border = borderStyle;
		button.onclick = clickEvent;

		if (className) {
			button.className = className;
		}
		button.style.backgroundColor = color;

		parent.appendChild(button);
	},
};

//Define hamburger menu prototype

const hamburgerMenuPrototype = {
	id: 'hamburger' + randomIdPostFix,
	mainMenu: 'mainMenu',
	width: 40,
	height: 40,
	color: '#cad317',

	render: function (parent) {
		let { id, mainMenuId, width, height, color } = this;

		const svgUrl = 'http://www.w3.org/2000/svg';
		let svg = document.createElementsNS(svgUrl, 'svg');
		let rect1 = document.createElementsNS(svgUrl, 'rect');
		let rect2 = document.createElementsNS(svgUrl, 'rect');
		let rect3 = document.createElementsNS(svgUrl, 'rect');

		//Set Svg Attributes

		svg.id = id;
		svg.classList.add('hamburger');
		svg.setAttribute('width', width);
		svg.setAttribute('height', height);
		svg.setAttribute('viewBox', '0 0 100 80');
		svg.setAttribute('fill', color);

		rect1.setAttribute('width', '100');
		rect1.setAttribute('height', '20');

		rect2.setAttribute('y', '30');
		rect2.setAttribute('width', '100');
		rect2.setAttribute('height', '20');

		rect3.setAttribute('y', '60');
		rect3.setAttribute('width', '100');
		rect3.setAttribute('height', '20');

		let menu = document.getElementById(mainMenuId);

		svg.addEventListener('click', () => {
			menu.style.display = 'block';
		});

		parent.appendChild(svg);
	},
};

//Define A Menu
const mainMenuPrototype = {
	links: {},
	id: 'mainMenu' + randomIdPostFix,
	hamburgerId: 'hamburger',
	mindWidth: '300px',
	maxWidth: '800px',
	backgroundColor: '#f4f1de',
	borderColor: '#3b1c0b',
	linkCOlor: '#3b1c0b',

	render: function (parent) {
		let { links, id, minWidth, maxWidth, backgroundColor, borderColor, linkColor } = this;

		let div = document.createElement('div');

		div.id = id;
		div.style.minWidth = minWidth;
		div.style.maxWidth = maxWidth;
		div.style.top = '-1px';
		div.style.left = '-1px';
		div.style.position = 'absolute';
		div.style.height = '70%';
		div.style.backgroundColor = backgroundColor;
		div.style.border = '1px solid' + borderColor;
		div.style.display = 'none';

		//Construct the menu
		let ul = document.createElement('ul');
		ul.style.padding = '1em';
		ul.style.fontSize = '1.25em';

		for (let link in links) {
			let li = document.createElement('li');
			let a = document.createElement('a');

			a.style.color = linkColor;
			a.href = links[link];
			a.innerHTML = link;

			li.innerHTML = a.outerHTML;

			ul.appendChild(li);
		}

		div.addEventListener('click', () => {
			div.style.display = 'none';
		});

		div.innerHTML = ul.outerHTML;

		parent.appendChild(div);
	},
};

//The list prototype
const listPrototype = {
	values: {},
	id: 'list' + randomIdPostFix,
	separator: ' - ',
	classNAme: '',
	formatCurrency: true,

	render: function (parent) {
		let { values, id, separator, className, formatCurrency } = this;

		if (!parent) {
			throw new Error('listPrototype: parent property not defined');
		}

		let ul = document.createElement('ul');
		ul.id = id;
		if (className) {
			ul.className = className;
		}

		for (let key in values) {
			let k = key;
			let v = values[key];
			let li = document.createElement('li');
			li.id = 'item' + replaceNonAlphanumericWithDashes(k);

			if (formatCurrency) {
				li.textContent = k + separator + intlFormat.format(v);
			} else {
				li.textContent = k + separator + v;
			}
			ul.appendChild(li);
		}
		parent.appendChild(ul);
	},
};

//Cart view prototype

const cartViewPrototype = {
	backgroundColor: '#f4f1de',
	borderStyle: '1px solid #3b1c0b',
	carTitle: 'Your Cart',

	cartContents: {},

	render: () => {
		let { backgroundColor, borderStyle, padding, cartTitle, cartContents } = this;

		let div = document.createElement('div');
		div.style.position = 'absolute';
		div.style.top = '50%';
		div.style.left = '50%';
		div.style.transform = 'translate(-50%, -50%)';
		div.style.backgroundColor = backgroundColor;
		div.style.border = borderStyle;
		div.style.padding = padding;
		div.style.minWidth = '300px';
		div.style.maxWidth = '600px;';

		let h2 = document.createElement('h2');
		h2.textContent = cartTitle;
		div.appendChild(h2);

		let ul = document.createElement('ul');

		for (let item in cartContents) {
			let price = cartContents[item];

			let li = document.createElement('li');

			li.textContent = k + separator + v;

			ul.appendChild(li);
		}

		div.appendChild(ul);
	},
};

document.addEventListener('DOMContentLoaded', () => {
	const body = document.body;
	const header = document.getElementsByTagName('header')[0];

	const coffeeMenu = document.getElementById('coffee-menu-container');

	let menu = Object.create(listPrototype);
	menu.values = inventory;
	menu.className = 'coffee-list';
	menu.render(coffeeMenu);

	for (let item in inventory) {
		let button = Object.create(buttonPrototype);
		button.id = 'button' + ' - ' + replaceNonAlphanumericWithDashes(item);

		button.text = 'Add to Cart';
		button.className = 'add-to-cart-button';

		button.clickEvent = function () {
			addToCart(item, inventory[item], 1);
			alert('Item added to cart!');
		};

		const itemId = 'item-' + replaceNonAlphanumericWithDashes(item);
		const li = document.getElementById(itemId);
		button.render(li);
	}

	let mainMenu = Object.create(mainMenuPrototype);
	mainMenu.id = 'mainMenu';
	mainMenu.links = menuLinks;

	mainMenu.render(body);

	let hamburgerMenu = Object.create(hamburgerMenuPrototype);
	hamburgerMenu.id = 'hamburger';
	hamburgerMenu.render(header);
});
