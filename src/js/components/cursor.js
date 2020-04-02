document.addEventListener('mousemove', event => {
	const button = document.querySelector('.launch-button');
	// Get the x & y coordinates of the cursor minus the the coordinates where the cursor is pointing to
	const x = event.pageX - 50;
	const y = event.pageY - 13;

	const targetX = button.offsetLeft + button.offsetWidth / 2 - 50;
	const targetY = button.offsetTop + button.offsetHeight / 2 - 13;

	// Get an angle, which are always in radians
	const angle = Math.atan2(y - targetY, x - targetX);
	// Let's convert it into degrees
	const degrees = (angle * 180) / Math.PI - 180;

	const cursor = document.querySelector('div#cursor');

	cursor.style.left = x + 'px';
	cursor.style.top = y + 'px';
	cursor.style.transform = `rotate(${degrees}deg)`;
});
