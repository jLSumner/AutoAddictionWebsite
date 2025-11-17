document.addEventListener('DOMContentLoaded', function () {
	const modal = document.getElementById('productModal');
	const closeBtn = document.querySelector('.close-btn');

	const modalImage = document.getElementById('modalImage');
	const modalTitle = document.getElementById('modalTitle');
	const modalDescription = document.getElementById('modalDescription');
	const modalBrand = document.getElementById('modalBrand');
	const modalPart = document.getElementById('modalPart');
	const modalPrice = document.getElementById('modalPrice');
	const modalQty = document.getElementById('modalQty');
	const modalSpecs = document.getElementById('modalSpecs');

	document.querySelectorAll('.popup-btn').forEach(btn => {
		btn.addEventListener('click', function () {
		const card = this.closest('.product-card');

		modalImage.src = card.dataset.image;
		modalImage.alt = card.dataset.name;
		modalTitle.textContent = card.dataset.name;
		modalDescription.textContent = card.dataset.description || '';
		modalBrand.textContent = card.dataset.brand;
		modalPart.textContent = card.dataset.part;
		modalPrice.textContent = card.dataset.price;
		modalQty.textContent = card.dataset.qty;
		modalSpecs.textContent = card.dataset.specs

		modal.style.display = 'flex';
		});
	});

	closeBtn.addEventListener('click', () => {
	modal.style.display = 'none';
	});

	window.addEventListener('click', (event) => {
		if (event.target === modal) {
		modal.style.display = 'none';
		}
	});
});