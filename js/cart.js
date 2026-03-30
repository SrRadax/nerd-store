// js/cart.js - Versión FINAL que debería hacer funcionar el Admin

function groupCart() {
  const grouped = {};
  cart.forEach(item => {
    if (!grouped[item.id]) {
      grouped[item.id] = { ...item, quantity: 0 };
    }
    grouped[item.id].quantity++;
  });
  return Object.values(grouped);
}

function renderCart() {
  const itemsContainer = document.getElementById("items");
  const cartContent = document.getElementById("cartContent");
  const emptyCart = document.getElementById("emptyCart");

  if (!itemsContainer) return;

  const grouped = groupCart();

  if (grouped.length === 0) {
    if (cartContent) cartContent.style.display = "none";
    if (emptyCart) emptyCart.style.display = "block";
    return;
  }

  if (cartContent) cartContent.style.display = "flex";
  if (emptyCart) emptyCart.style.display = "none";

  let html = "";
  let total = 0;

  grouped.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    html += `
      <div class="cart-item">
        <img src="${item.img}" alt="${item.name}">
        <div class="cart-item-info">
          <h3>${item.name}</h3>
          <p>$${item.price} c/u</p>
        </div>
        <div class="cart-controls">
          <button onclick="changeQty(${item.id}, -1)" class="qty-btn">−</button>
          <span class="qty">${item.quantity}</span>
          <button onclick="changeQty(${item.id}, 1)" class="qty-btn">+</button>
          <button onclick="removeFromCart(${item.id})" class="delete-btn">🗑️</button>
        </div>
        <div style="margin-left:20px; font-weight:bold; min-width:90px; text-align:right;">
          $${itemTotal}
        </div>
      </div>
    `;
  });

  itemsContainer.innerHTML = html;

  const totalEl = document.getElementById("total");
  if (totalEl) totalEl.textContent = `$${total}`;
}

function changeQty(id, change) {
  if (change > 0) {
    const product = products.find(p => p.id === id);
    if (product) cart.push(product);
  } else {
    for (let i = cart.length - 1; i >= 0; i--) {
      if (cart[i].id === id) {
        cart.splice(i, 1);
        break;
      }
    }
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  if (typeof updateCartCount === "function") updateCartCount();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  if (typeof updateCartCount === "function") updateCartCount();
}

function iniciarCompra() {
  if (cart.length === 0) {
    showToast("El carrito está vacío", "error");
    return;
  }

  if (!isLoggedIn()) {
    showToast("Debes iniciar sesión para continuar con la compra", "error");
    setTimeout(() => window.location.href = "login.html", 1600);
    return;
  }

  const grouped = groupCart();
  const total = grouped.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const customerName = localStorage.getItem("user") || "Cliente";

  // Guardar directamente en localStorage (más confiable)
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  const newOrder = {
    customer: customerName,
    date: new Date().toLocaleDateString('es-AR'),
    items: grouped,
    total: total
  };
  orders.push(newOrder);
  localStorage.setItem("orders", JSON.stringify(orders));

  console.log("Orden guardada directamente:", newOrder);

  // Guardar para comprobante
  localStorage.setItem("lastOrder", JSON.stringify({
    customer: customerName,
    items: grouped,
    total: total,
    date: new Date().toLocaleDateString('es-AR')
  }));

  // Limpiar carrito
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));

  window.location.href = "checkout.html";
}

function back() {
  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  if (typeof updateCartCount === "function") updateCartCount();
});