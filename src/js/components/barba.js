import barba from '@barba/core';
import { gsap } from 'gsap';

// const runScripts = () => {
// 	const welcomeChachaclub = document.querySelector('.intro1');
// };

// runScripts();

barba.init({
	transitions: [
		{
			name: 'fade',
			once({ current, next, trigger }) {
				return new Promise(resolve => {
					const timeline = gsap.timeline({
						onComplete() {
							resolve();
						}
					});

					timeline
						.set('.activate h2', { y: '2%' })
						.set('.activate svg, .activate h2', { opacity: 0 })
						.to('.activate svg', { opacity: 1, y: 0, duration: 2 }, 0.3)
						.to('.activate h2', { opacity: 1, y: 0 }, 0.5);
				});
			}
		}
	]
});
