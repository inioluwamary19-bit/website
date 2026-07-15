const cartItems = [];
const cartCountEl = document.getElementById('cart-count');
const cartListEl = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');

function renderCart() {
  cartCountEl.textContent = cartItems.length;

  if (cartItems.length === 0) {
    cartListEl.innerHTML = '<li>Your cart is empty.</li>';
    cartTotalEl.textContent = '$0';
    return;
  }

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);
  cartListEl.innerHTML = '';

  cartItems.forEach((item) => {
    const li = document.createElement('li');
    li.innerHTML = `<span>${item.name}</span><span>$${item.price}</span>`;
    cartListEl.appendChild(li);
  });

  cartTotalEl.textContent = `$${total}`;
}

document.querySelectorAll('.add-btn').forEach((button) => {
  button.addEventListener('click', () => {
    const name = button.getAttribute('data-product');
    const price = Number(button.getAttribute('data-price'));

    cartItems.push({ name, price });
    renderCart();
  });
});

renderCart();
