// js/script.js - Versión FINAL corregida

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ==================== PRODUCTOS (con descripciones mejoradas) ====================
const products = [
  { 
    id: 1, 
    name: "PC Gamer RTX 4070", 
    desc: "PC de alta gama diseñado para gaming en 1440p y 4K con excelentes FPS. Ideal para streamers y gamers exigentes.", 
    price: 1899, 
    cat: "gamer", 
    img: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=600" 
  },
  { 
    id: 2, 
    name: "PC Gamer Ryzen 5 5500 + RTX 3050", 
    desc: "La mejor opción para quienes recién empiezan en el mundo del gaming. Excelente relación calidad-precio.", 
    price: 999, 
    cat: "gamer", 
    img: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600" 
  },
  { 
    id: 3, 
    name: "PC Gamer RTX 4060 Ti", 
    desc: "Rendimiento excepcional en 1440p con Ray Tracing y DLSS. Perfecto para juegos actuales y futuros.", 
    price: 1399, 
    cat: "gamer", 
    img: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600" 
  },
  { 
    id: 4, 
    name: "PC Gamer Ryzen 7 5700X + RTX 4070", 
    desc: "Configuración profesional para streaming, edición de video y gaming AAA al máximo nivel.", 
    price: 2199, 
    cat: "gamer", 
    img: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=600" 
  },
  { 
    id: 5, 
    name: "Laptop Gamer RTX 4050", 
    desc: "Portátil gaming potente con pantalla 144Hz. Ideal para llevar tu setup a cualquier lado.", 
    price: 1499, 
    cat: "gamer", 
    img: "https://images.unsplash.com/photo-1603302576837-37561b2e2308?w=600" 
  },
  { 
    id: 6, 
    name: "PC Oficina Ryzen 5", 
    desc: "Equipo rápido y eficiente para trabajo, estudio y multitarea diaria. Muy silencioso.", 
    price: 679, 
    cat: "oficina", 
    img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600" 
  },
  { 
    id: 7, 
    name: "PC Oficina Intel i5", 
    desc: "Ideal para oficinas, estudiantes y uso profesional. Gran rendimiento en aplicaciones diarias.", 
    price: 749, 
    cat: "oficina", 
    img: "https://images.unsplash.com/photo-1588872657578-2f8e3e3b7f0f?w=600" 
  },
  { 
    id: 8, 
    name: "RTX 4060 8GB", 
    desc: "Placa de video potente y eficiente. Excelente para upgrades y gaming en 1080p/1440p.", 
    price: 449, 
    cat: "componentes", 
    img: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=600" 
  },
  { 
    id: 9, 
    name: "Monitor Gamer 27\" 180Hz", 
    desc: "Monitor IPS de alta frecuencia de actualización. Colores vibrantes y respuesta ultra rápida.", 
    price: 329, 
    cat: "componentes", 
    img: "https://images.unsplash.com/photo-1616763355548-1b9f8c3f4d6f?w=600" 
  },
  { 
    id: 10, 
    name: "Ryzen 5 5600X", 
    desc: "Procesador de 6 núcleos y 12 hilos. Gran opción para gaming y productividad.", 
    price: 399, 
    cat: "componentes", 
    img: "https://images.unsplash.com/photo-1591799264318-7e6ef8b0f0e6?w=600" 
  }
];

// ==================== FUNCIONES DEL CARRITO ====================
function getQuantityInCart(id) {
  return cart.filter(item => item.id === id).length;
}

function renderProducts(list = products) {
  const container = document.getElementById("products");
  if (!container) return;

  container.innerHTML = "";

  list.forEach(product => {
    const qty = getQuantityInCart(product.id);

    let actionHTML = qty > 0 ? `
      <div class="controls" style="margin-top:15px; display:flex; align-items:center; justify-content:center; gap:12px;">
        <button class="qty-btn" onclick="event.stopImmediatePropagation(); changeQty(${product.id}, -1)">−</button>
        <span style="font-size:20px; font-weight:bold;">${qty}</span>
        <button class="qty-btn" onclick="event.stopImmediatePropagation(); changeQty(${product.id}, 1)">+</button>
        <button class="delete-btn" onclick="event.stopImmediatePropagation(); removeFromCart(${product.id})">🗑️</button>
      </div>
    ` : `
      <button class="action-btn" onclick="event.stopImmediatePropagation(); addToCart(${product.id})" style="margin-top:15px; width:100%;">
        Agregar al carrito
      </button>
    `;

    container.innerHTML += `
      <div class="card" onclick="goToDetail(${product.id})" style="cursor: pointer;">
        <img src="${product.img}" alt="${product.name}" style="height: 180px; object-fit: cover;">
        <h3>${product.name}</h3>
        <p class="desc">${product.desc}</p>
        <p class="price">$${product.price}</p>
        ${actionHTML}
      </div>
    `;
  });
}

function addToCart(id) {
  if (!isLoggedIn()) {
    showToast("Debes iniciar sesión para agregar productos al carrito", "error");
    setTimeout(() => window.location.href = "login.html", 1600);
    return;
  }

  const product = products.find(p => p.id === id);
  if (product) {
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderProducts();
    updateCartCount();
    showToast(`${product.name} agregado al carrito`, "success");
  }
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
  renderProducts();
  updateCartCount();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderProducts();
  updateCartCount();
}

function updateCartCount() {
  const countElement = document.getElementById("count");
  if (countElement) countElement.textContent = cart.length;
}

// ==================== FILTROS Y BÚSQUEDA ====================
function filter(cat) {
  if (cat === "all") renderProducts(products);
  else renderProducts(products.filter(p => p.cat === cat));
}

function setupSearch() {
  const searchInput = document.getElementById("search");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const value = e.target.value.toLowerCase();
      const filtered = products.filter(p => 
        p.name.toLowerCase().includes(value) || 
        (p.desc && p.desc.toLowerCase().includes(value))
      );
      renderProducts(filtered);
    });
  }
}

function goToDetail(id) {
  window.location.href = `detalle.html?id=${id}`;
}

function goCart() {
  window.location.href = "cart.html";
}

function goToLogin() {
  window.location.href = "login.html";
}

// Verificar login
function isLoggedIn() {
  return localStorage.getItem("currentUser") !== null;
}

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  updateCartCount();
  setupSearch();
});

// ====================== ACCESO PROTEGIDO AL ADMIN ======================
const ADMIN_PASSWORD = "admin123";   // ← Cambia esto si querés otra contraseña

function goToAdmin() {
  const enteredPassword = prompt("🔒 Ingresa la contraseña de Administrador:");

  if (enteredPassword === null) {
    // El usuario canceló el prompt
    return;
  }

  if (enteredPassword === ADMIN_PASSWORD) {
    window.location.href = "admin.html";
  } else {
    showToast("❌ Contraseña incorrecta", "error");
  }
}