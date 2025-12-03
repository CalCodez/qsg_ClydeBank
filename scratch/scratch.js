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
