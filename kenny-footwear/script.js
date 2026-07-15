const cartItems = [];
const cartCountEl = document.getElementById('cart-count');

function updateCart() {
  cartCountEl.textContent = cartItems.length;
}

document.querySelectorAll('.add-btn').forEach((button) => {
  button.addEventListener('click', () => {
    const name = button.getAttribute('data-product');
    const price = Number(button.getAttribute('data-price'));

    cartItems.push({ name, price });
    updateCart();
    button.textContent = 'Added';
    button.disabled = true;
  });
});

updateCart();
