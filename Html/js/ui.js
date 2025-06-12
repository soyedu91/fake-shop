

export function renderProducts(products, onProductClick) {
  const productsContainer = document.getElementById('productsContainer');
  productsContainer.innerHTML = '';

  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'col-sm-6 col-md-4 col-lg-3';
    card.innerHTML = `
      <div class="card h-100">
        <img src="${product.image}" class="card-img-top p-3" style="height: 200px; object-fit: contain;">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text">$${product.price}</p>
          <button class="btn btn-outline-primary mt-auto" data-id="${product.id}">Ver detalles</button>
        </div>
      </div>`;
    card.querySelector('button').addEventListener('click', () => onProductClick(product));
    productsContainer.appendChild(card);
  });
}