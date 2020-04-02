import { gsap } from 'gsap';
// import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

// gsap.registerPlugin(MotionPathPlugin);

// gsap.to('#club', {
// 	duration: 5,
// 	repeat: 12,
// 	repeatDelay: 3,
// 	yoyo: true,
// 	ease: 'power1.inOut',
// 	motionPath: {
// 		path: '#club-path',
// 		align: '#club-path',
// 		autoRotate: true,
// 		alignOrigin: [0.5, 0.5]
// 	}
// });

const launchButton = document.querySelector('.launch-button');

launchButton.addEventListener('click', () => {
	// Hide the custom cursor
	const cursor = document.querySelector('div#cursor');
	cursor.style.display = 'none';
	// Show the normal cursor
	const launchScreen = document.querySelector('.launch-screen');
	launchScreen.style.cursor = 'auto';

	// Show the parallax sections
	const parallaxSections = document.querySelectorAll('.intro_no_parallax, .intro_parallax');
	parallaxSections.forEach(section => {
		section.classList.remove('hidden');
	});

	// Create & play audio
	const audio = document.createElement('audio');
	audio.setAttribute('src', '../star-wars.mp3');
	audio.pause();
	audio.currentTime = 0;
	audio.play();

	const timeline = gsap.timeline({
		onComplete() {
			resolve();
		}
	});

	timeline
		.to('.launch-screen .launch-button', {
			opacity: 0,
			height: 0,
			pointerEvents: 'none',
			padding: 0,
			duration: 1
		})
		.to('.launch-screen h2', { opacity: 0 }, 1)
		.to(
			'.launch-screen .button, .launch-content h2, .launch-content .button-space',
			{
				height: 0,
				duration: 1
			},
			1
		)
		.to('.launch-screen svg path', { fill: '#EC7A75', duration: 1 }, 2)
		.to('.launch-screen', { backgroundColor: '#0F288C', duration: 1 }, 2)
		// .to('.launch-screen svg path', { fill: '#EC7A75', duration: 1 }, 2)
		.to('.launch-screen', { backgroundColor: '#EC7A75', duration: 1 }, 3)
		.to('.launch-screen', { display: 'none' }, 4);

	// .to('.launch-button', { color: 'transparent', duration: 0.3 }, 0)
	// 	.to('.launch-button', { height: '0vh', pointerEvents: 'none', duration: 1 }, 0)
	// 	.to('.activate', { height: '100vh', backgroundColor: '#0F288C', duration: 0.75 }, 0)
	// .to('.spin path', { fill: '#EC7A75', duration: 0.5 }, 0)
	// 	.to(
	// 		'.activate spin, .activate h2',
	// 		{ opacity: '0', transform: 'translateY(50px)', duration: 0.5 },
	// 		0
	// 	);

	// .to('.activate spin', { margin: '0' })
	// .to('.activate h2', { display: 'none', duration: 0.5 }, 3)
	// .to('.launch-button', { opacity: '0', pointerEvents: 'none' }, 1)
	// .to('.launch-screen', { backgroundColor: '#222' }, 3)
	// .to('.launch-screen', { backgroundColor: '#F28' }, 4)
	// .to('.launch-screen', { opacity: '0' }, 5)
	// .to('.launch-screen', { display: 'none' }, 6);
});

// var path = document.querySelector('#club path');
// var length = path.getTotalLength();
// // Clear any previous transition
// path.style.transition = path.style.WebkitTransition = 'none';
// // Set up the starting positions
// path.style.strokeDasharray = length + ' ' + length;
// path.style.strokeDashoffset = length;
// // Trigger a layout so styles are calculated & the browser
// // picks up the starting position before animating
// path.getBoundingClientRect();
// // Define our transition
// path.style.transition = path.style.WebkitTransition = 'stroke-dashoffset 2s ease-in-out';
// // Go!
// path.style.strokeDashoffset = '0';
