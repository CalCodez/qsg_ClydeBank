//Inventory

let menuList = document.getElementById('coffee-menu');

// function populateMenu(container) {
// 	let inventory = ['Regular Coffee', 'Espresso', 'Cappuccino', 'Latte'];
// 	let inventoryPrices = [3.0, 3.5, 4.0, 4.25];

// 	for (let i = 0; i < inventory.length; i++) {
// 		container.innerHTML += '<li>' + inventory[i] + ' - $' + inventoryPrices[i].toFixed(2) + '</li>';
// 	}
// }
// populateMenu(menuList);

let menu = {
	inventory: {
		'Regular Coffee': 3.0,
		Espresso: 3.5,
		Cappuccino: 4.0,
		Latte: 4.25,
	},

	populate: function (container) {
		for (let item in this.inventory) {
			let price = this.inventory[item];

			container.innerHTML += '<li>' + item + '  - $' + price.toFixed(2) + '</li>';
		}
	},
};

menu.populate(menuList);
