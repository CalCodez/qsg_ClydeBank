//Inventory

let inventory = ['Regular Coffee', 'Espresso', 'Cappuccino', 'Latte'];
let inventoryPrices = [3.0, 3.5, 4.0, 4.25];
let menuList = document.getElementById('coffee-menu');

function populateMenu(container) {
	for (let i = 0; i < inventory.length; i++) {
		container.innerHTML += '<li>' + inventory[i] + ' - $' + inventoryPrices[i].toFixed(2) + '</li>';
	}
}
populateMenu(menuList);
