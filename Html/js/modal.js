let selectedProduct = null;

export function showModal(product) {
  selectedProduct = product;
  document.getElementById('modalImage').src = product.image;
  document.getElementById('modalTitle').textContent = product.title;
  document.getElementById('modalDescription').textContent = product.description;
  document.getElementById('modalPrice').textContent = product.price;
  new bootstrap.Modal(document.getElementById('productModal')).show();
}

export function getSelectedProduct() {
  return selectedProduct;
}