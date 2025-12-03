//++Scratch File Example
const firstNameTextBox = document.getElementById('firstName');
const submitButton = document.getElementById('submit');
const greetingContainer = document.getElementById('greeting');

submitButton.addEventListener('click', () => {
	greetingContainer.textContent = `Hello, ${firstNameTextBox.value}!`;
});

//++Switch File Example
const colorSelector = document.getElementById('colorSelector');
const colorSquare = document.getElementById('colorSquare');

colorSelector.addEventListener('change', () => {
	colorSquare.style.backgroundColor = colorSelector.value;
});

//++Clicked File Example
let theButton = document.getElementById('theButton');

theButton.addEventListener(
	'click',
	(function () {
		let clickCount = 0;
		return function () {
			clickCount += 1;

			this.textContent = `Clicked ${clickCount} times!`;
		};
	})()
);

//++Switch File Example 2
const colorSelector2 = {
	colors: {
		red: '#ff0000',
		orange: '#ffa500',
		yellow: '#ffff00',
		green: '#008000',
		blue: '#0000ff',
		indigo: '#4b0082',
		violet: '#ee82ee',
	},

	render: (parent, swatch, id = '', className = '') => {
		let select = document.createElement('select');

		//``If there was an ID this would assign the ID to the select ELement
		if (id) {
			select.id = id;
		}

		//``If three was an className this would assign the className to the select Element.
		if (className) {
			select.className = className;
		}

		for (let color in colorSelector2.colors) {
			let option = document.createElement('option');
			option.value = colorSelector2.colors[color];
			option.innerHTML = color.charAt(0).toUpperCase() + color.slice(1);
			select.appendChild(option);
		}
		select.addEventListener('change', (e) => {
			swatch.style.backgroundColor = e.target.value;
		});
		parent.appendChild(select);
	},
};

let colorSwatch = document.getElementById('colorSwatch');
let colorSelection = document.getElementById('colorSelection');
colorSelector2.render(colorSelection, colorSwatch);
