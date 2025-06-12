//Constructor del carrito
export function renderCart() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItems = document.getElementById('cartItems');
  cartItems.innerHTML = '';

  
  cart.forEach(item => {
    const div = document.createElement('div');
    div.className = 'd-flex align-items-center mb-3 border-bottom pb-2';
    div.innerHTML = `
  <img src="${item.image}" style="width: 60px; height: 60px; object-fit: contain;">
  <div class="ms-2 flex-grow-1">
    <h6>${item.title}</h6>
    <div class="d-flex align-items-center">
      <button class="btn btn-sm btn-outline-primary" ${item.quantity === 1 ? 'disabled' : ''} title="Disminuir cantidad">
        <i class="bi bi-dash"></i>
      </button>
      <span class="mx-2">${item.quantity}</span>
      <button class="btn btn-sm btn-outline-primary" title="Aumentar cantidad">
        <i class="bi bi-plus"></i>
      </button>
      <button class="btn btn-sm btn-danger ms-3" title="Eliminar producto">
        <i class="bi bi-trash"></i>
      </button>
    </div>
    <p class="m-0 mt-1">Precio: $${(item.price * item.quantity).toFixed(2)}</p>
  </div>`;

    cartItems.appendChild(div);

    // Agregar eventos a los botones dinámicamente
    const btns = div.querySelectorAll('button');
    btns[0].addEventListener('click', () => updateQuantity(item.id, -1));
    btns[1].addEventListener('click', () => updateQuantity(item.id, 1));
    btns[2].addEventListener('click', () => removeItem(item.id));
  });

    if (cart.length === 0) {
    cartItems.innerHTML = '<p class="text-center">El carrito está vacío</p>';
    document.querySelector('.btn-success').disabled = true; // Deshabilitar botón de finalizar compra
    document.querySelector('.btn-outline-danger').disabled = true; // Deshabilitar botón de eliminar todo
    return;
  }
  else {
    document.querySelector('.btn-success').disabled = false; // Habilitar botón de finalizar compra
    document.querySelector('.btn-outline-danger').disabled = false; // Habilitar botón de eliminar todo
  }
}

//Agregar
export function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const index = cart.findIndex(p => p.id === product.id);
  if (index !== -1) {
    cart[index].quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

//Boton dentro del sidebar +-
export function updateQuantity(id, delta) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const index = cart.findIndex(p => p.id === id);
  if (index !== -1) {
    cart[index].quantity += delta;
    if (cart[index].quantity < 1) cart[index].quantity = 1;
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
  updateCartCount();
}

//Boton eliminar del sidebar
export function removeItem(id) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(p => p.id !== id);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
  updateCartCount();
}

//Boton finalizar compra
export function finalizarCompra() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const btnFinalizar = document.querySelector('.btn-success');

  // Si hay productos, procedemos con la compra
  localStorage.removeItem('cart');
  renderCart();
  updateCartCount();

  // Deshabilitamos el botón porque ya no hay productos tras finalizar compra
  btnFinalizar.disabled = true;

  Swal.fire({
    icon: 'success',
    title: '¡Compra realizada!',
    text: 'Gracias por tu compra',
    timer: 1500,
    showConfirmButton: false,
  });
}

// Botón para eliminar todo el carrito
export function eliminarTodo() {
  localStorage.removeItem('cart');
  renderCart();
  updateCartCount();
}

// Actualiza el contador del carrito en el encabezado
export function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById('cartCount').textContent = total;
}

// Función para alternar la visibilidad del sidebar del carrito
export function toggleCart() {
  document.getElementById('cartSidebar').classList.toggle('active');
 
}
