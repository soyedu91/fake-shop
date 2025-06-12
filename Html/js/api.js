export async function fetchProducts() {
  const response = await fetch('https://fakestoreapi.com/products');
  return response.json();
}