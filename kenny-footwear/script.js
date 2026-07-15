const cartButton = document.querySelector('.nav-btn');
const badge = document.querySelector('.cart-badge');
let cartCount = 0;

function updateCart() {
  if (badge) {
    badge.textContent = cartCount;
  }
}

document.querySelectorAll('.add-btn').forEach((button) => {
  button.addEventListener('click', () => {
    cartCount += 1;
    updateCart();
    button.textContent = 'Added';
    button.disabled = true;
  });
});

updateCart();
