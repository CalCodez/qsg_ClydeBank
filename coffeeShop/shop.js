const hamburgerMenu = {
	render: (parent, id = 'hamburger', mainMenuId = 'mainMenu', width = 40, height = 40) => {
		let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		let rect1 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
		let rect2 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
		let rect3 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

		svg.id = id;
		svg.classList.add('hamburger');
		svg.setAttribute('width', width);
		svg.setAttribute('height', height);
		svg.setAttribute('viewBox', '0 0 100 80');
		svg.setAttribute('fill', '#cad317');

		rect1.setAttribute('width', '100');
		rect1.setAttribute('height', '20');

		rect2.setAttribute('y', '30');
		rect2.setAttribute('width', '100');
		rect2.setAttribute('height', '20');

		rect3.setAttribute('y', '60');
		rect3.setAttribute('width', '100');
		rect3.setAttribute('height', '20');

		svg.appendChild(rect1);
		svg.appendChild(rect2);
		svg.appendChild(rect3);

		svg.style.cursor = 'pointer';
		let menu = document.getElementById(mainMenuId);

		svg.addEventListener('click', () => {
			if (menu.style.display == 'block') {
				menu.style.display = 'none';
			} else {
				menu.style.display = 'block';
			}
		});

		parent.appendChild(svg);
	},
};

const mainMenu = {
	render: (
		parent,
		links,
		id = 'mainMenu',
		hamburgerId = 'hamburger',
		minWidth = '300px',
		maxWidth = '800px',
		backgroundColor = '#f4f1de',
		borderColor = '#3b1c0b',
		linkColor = '#3b1c0b'
	) => {
		let div = document.createElement('div');

		div.id = id;
		div.style.minWidth = minWidth;
		div.style.maxWidth = maxWidth;
		div.style.top = '-1px';
		div.style.left = '-1px';
		div.style.position = 'absolute';
		div.style.height = '70%';
		div.style.backgroundColor = backgroundColor;
		div.style.borderColor = '1px solid' + borderColor;

		div.style.display = 'none';

		let ul = document.createElement('ul');
		ul.style.padding = '1em';
		ul.style.fontSize = '1.25em';

		for (let link in links) {
			let li = document.createElement('li');
			let a = document.createElement('a');

			a.style.color = linkColor;

			li.style.listStyle = 'none';

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

const listPrototype = {
	render: (values, parent, id, separator = ' -$', className = '') => {
		let ul = document.createElement('ul');

		ul.id = id;

		if (className) {
			ul.className = className;
		}

		for (let key in values) {
			let k = key;
			let v = values[key];

			let li = document.createElement('li');
			// li.textContent = key + separator + values.toFixed(2);
			li.textContent = k + separator + v.toFixed(2);

			ul.appendChild(li);
		}
		parent.appendChild(ul);
	},
};

const menuLinks = {
	Home: 'index.html',
	About: 'index.html',
	Contact: 'index.html',
};

let inventory = {
	'Regular Coffee': 3.0,
	Espresso: 3.5,
	Cappuccino: 4.0,
	Latte: 4.25,
};

document.addEventListener('DOMContentLoaded', () => {
	const header = document.getElementsByTagName('header')[0];

	let menuList = document.getElementById('coffee-menu-container');

	let menu = Object.create(listPrototype);

	menu.render(inventory, menuList, 'coffee-menu', ' -$', 'coffee-list');

	mainMenu.render(main, menuLinks);

	hamburgerMenu.render(header);
});

console.log(document.cookie);
