document.addEventListener("DOMContentLoaded", function() {
	var headerContainer = document.getElementById("header");
	if (headerContainer) {
		headerContainer.innerHTML = `
			<header>
				<div class="header-top">
					<div class="brand-logo">
						<a href="index">
						<img src="images/logos/logo.png" alt="Auto Addiction Bendigo Logo">
						</a>
					</div>
				</div>
				<nav class="navbar">
					<a href="javascript:void(0);" class="toggle-button">
						<span class="bar"></span>
						<span class="bar"></span>
						<span class="bar"></span>
					</a>
					<div class="navbar-links">
						<ul>
							<li><a href="index">HOME</a></li>
							<li><a href="services">SERVICES</a></li>
							<li><a href="audio">AUDIO & ENTERTAINMENT</a></li>
							<li><a href="4wd">4WD ACCESSORIES</a></li>
							<li><a href="about">ABOUT AUTO ADDICTION BENDIGO</a></li>
							<li><a href="contact">CONTACT</a></li>
						</ul>
					</div>
				</nav>
			</header>
		`;
	}

	var path = window.location.pathname;
	var page = path.split("/").pop() || "index";
	var navLinks = document.querySelectorAll(".navbar-links ul li a");
	navLinks.forEach(function(link) {
		if (link.getAttribute("href") === page) {
		link.classList.add("active");
		}
	});

	var toggleButton = document.querySelector('.toggle-button');
	var navbarLinks = document.querySelector('.navbar-links');
	toggleButton.addEventListener('click', function() {
		navbarLinks.classList.toggle('menu-open');
	});
});
