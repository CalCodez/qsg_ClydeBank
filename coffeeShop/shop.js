const hamburgerMenu = {
	render: (parent, id = 'hamburger', width = 40, height = 40) => {
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

		rect1.setAttribute('width', 100);
		rect1.setAttribute('height', '20');

		rect2.setAttribute('y', '30');
		rect2.setAttribute('width', '100');
		rect2.setAttribute('height', ' 20');

		rect2.setAttribute('y', '60');
		rect2.setAttribute('width', '100');
		rect2.setAttribute('height', ' 20');

		svg.appendChild(rect1);
		svg.appendChild(rect2);
		svg.appendChild(rect3);

		parent.appendChild(svg);
	},
};

const listPrototype = {
	render: (values, parent, id, separator = ' -$', className = '') => {
		let ul = document.createElement('ul');

		if (id) {
			ul.id = id;
		}

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
let inventory = {
	'Regular Coffee': 3.0,
	Espresso: 3.5,
	Cappuccino: 4.0,
	Latte: 4.25,
};

document.addEventListener('DOMContentLoaded', (e) => {
	const header = document.getElementsByTagName('header')[0];

	let menuList = document.getElementById('coffee-menu-container');

	let menu = Object.create(listPrototype);

	menu.render(inventory, menuList, 'coffee-menu', ' -$', 'coffee-list');

	hamburgerMenu.render(header);
});
