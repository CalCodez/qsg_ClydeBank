//Inventory

let menuList = document.getElementById('coffee-menu');

//++Populate Menu Variation 1
// function populateMenu(container) {
// 	let inventory = ['Regular Coffee', 'Espresso', 'Cappuccino', 'Latte'];
// 	let inventoryPrices = [3.0, 3.5, 4.0, 4.25];

// 	for (let i = 0; i < inventory.length; i++) {
// 		container.innerHTML += '<li>' + inventory[i] + ' - $' + inventoryPrices[i].toFixed(2) + '</li>';
// 	}
// }
// populateMenu(menuList);

//``Used a for loop to iterate over the inventory and inventoryPrices

//++Populate Menu Variation 2

// let menu = {
// 	inventory: {
// 		'Regular Coffee': 3.0,
// 		Espresso: 3.5,
// 		Cappuccino: 4.0,
// 		Latte: 4.25,
// 	},

// 	populate: function (container) {
// 		for (let item in this.inventory) {
// 			let price = this.inventory[item];

// 			container.innerHTML += '<li>' + item + '  - $' + price.toFixed(2) + '</li>';
// 		}
// 	},
// };

// menu.populate(menuList);

//``Converted inventory and inventory prices into a JSON like object

//++Populate menu variation 3

let menu = {
	inventory: {
		'regular Coffee': 4.0,
		Espresso: 4.5,
		Cappuccino: 4.75,
		Latte: 5.0,
	},

	populate: function (container) {
		for (let item in this.inventory) {
			let price = this.inventory[item].toFixed(2);

			let li = document.createElement('li');

			li.textContent = `${item} -  ${price}`;

			container.appendChild(li);
		}
	},
};

menu.populate(menuList);
