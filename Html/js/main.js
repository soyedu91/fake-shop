import { fetchProducts } from './api.js';
import { renderProducts } from './ui.js';
import { showModal, getSelectedProduct } from './modal.js';
import { 
  addToCart, renderCart, updateQuantity, removeItem, 
  finalizarCompra, eliminarTodo, updateCartCount, toggleCart 
} from './cart.js';


//Main
document.addEventListener('DOMContentLoaded', async () => {
  const products = await fetchProducts();
  renderProducts(products, showModal);
  updateCartCount();

  //click agregar al carrito
  document.getElementById('addToCartBtn').addEventListener('click', () => {
    addToCart(getSelectedProduct());
    bootstrap.Modal.getInstance(document.getElementById('productModal')).hide();
    Swal.fire({
    icon: 'success',
    title: '¡Agregado!',
    text: 'Producto agregado al carrito',
    timer: 1500,
    showConfirmButton: false,
  });
  // Actualizar el carrito por si esta abierto el sidebar
  renderCart();
  });

  //boton carrito/sidebar
  document.getElementById('cartBtn').addEventListener('click', () => {
    toggleCart();
    renderCart();
  });

  //Buscador
  document.getElementById('searchInput').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredProducts = products.filter(product =>
      product.title.toLowerCase().includes(searchTerm) 
    );
    renderProducts(filteredProducts, showModal);
  });

  //Boton cerrar carrito
  document.querySelector('#cartSidebar .btn-danger').addEventListener('click', () => {
  toggleCart();
  });

  //Boton finalizar compra
  document.querySelector('.btn-success').addEventListener('click', () => {
    finalizarCompra();
  });

  //Boton eliminar todo
  document.querySelector('.btn-outline-danger').addEventListener('click', () => {
    eliminarTodo();
  });
});
