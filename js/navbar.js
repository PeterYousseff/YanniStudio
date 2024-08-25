document.addEventListener("DOMContentLoaded", (event) => {
	var menuToggle = document.getElementById("menuToggle");

	var menuBar = gsap.timeline({ paused: true });

	menuBar.to('.bar-1', 0.4, {
			attr: { d: "M8,2 L2,8" },
			x: 1,
			ease: Power2.easeInOut
	}, 'start')

	menuBar.to('.bar-2', 0.4, {
			autoAlpha: 0
	}, 'start')

	menuBar.to('.bar-3', 0.4, {
			attr: { d: "M8,8 L2,2" },
			x: 1,
			ease: Power2.easeInOut
	}, 'start')

	menuBar.reverse();

	var navTl = gsap.timeline({ paused: true });

	navTl.to('.fullpage-menu', {
			duration: 0,
			display: "block",
			ease: Expo.easeInOut
	}, "<");

	navTl.to('.menu-bg', {
			duration: 1,
			opacity: 1,
			ease: Expo.easeInOut
	}, "<");

	navTl.from('.main-menu li a', {
			duration: 1,
			y: "100%",
			rotateY: 30,
			stagger: 0.2,
			ease: Expo.easeInOut
	}, "-=0.5");

	navTl.reverse();

	menuToggle.addEventListener('click', function () {
			menuBar.reversed(!menuBar.reversed());
			navTl.reversed(!navTl.reversed());
	});

	// Add event listener to each link in the fullpage-menu
	document.querySelectorAll('.fullpage-menu .target').forEach(link => {
			link.addEventListener('click', function () {
					menuBar.reversed(true);
					navTl.reversed(true);
			});
	});
});
