function loadProducts(element) {
  const category = element.getAttribute('data-category');

  fetch(`http://localhost:3000/api/products/category/${category}`)
    .then(res => res.json())
    .then(products => {
      const container = document.querySelector('.productMain');
      container.innerHTML = ''; // Clear previous content

      products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        const title = document.createElement('h3');
        title.textContent = product.name;

        const description = document.createElement('p');
        description.textContent = product.description;

        const price = document.createElement('p');
        price.innerHTML = `<strong>Price:</strong> $${product.price}`;

        const image = document.createElement('img');
        image.src = product.image;
        image.alt = product.name;
        image.classList.add('product-image');

        productCard.appendChild(title);
        productCard.appendChild(description);
        productCard.appendChild(price);
        productCard.appendChild(image);

        container.appendChild(productCard);
      });
    })
    .catch(err => {
      console.error('Error loading products:', err);
      container.innerHTML = '<p>Failed to load products.</p>';
    });
}