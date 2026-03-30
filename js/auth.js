// js/auth.js - Sistema de login y registro (corregido)

let users = JSON.parse(localStorage.getItem("users")) || [];

// ====================== REGISTRO ======================
function register() {
  const email = document.getElementById("email").value.trim();
  const pass = document.getElementById("pass").value.trim();

  if (!email || !pass) {
    showToast("Por favor completa todos los campos", "error");
    return;
  }

  if (users.some(u => u.email === email)) {
    showToast("Este email ya está registrado", "error");
    return;
  }

  users.push({ email, pass });
  localStorage.setItem("users", JSON.stringify(users));

  showToast("¡Registro exitoso!", "success");
  setTimeout(() => window.location.href = "login.html", 1400);
}

// ====================== LOGIN ======================
function login() {
  const userInput = document.getElementById("user").value.trim();
  const passInput = document.getElementById("pass").value.trim();

  if (!userInput || !passInput) {
    showToast("Ingresa usuario y contraseña", "error");
    return;
  }

  const found = users.find(u => 
    (u.email === userInput || u.user === userInput) && u.pass === passInput
  );

  if (found) {
    // Guardamos correctamente el usuario logueado
    localStorage.setItem("currentUser", found.email || userInput);
    localStorage.setItem("logged", "true");

    showToast(`¡Bienvenido ${found.email || userInput}!`, "success");
    setTimeout(() => window.location.href = "index.html", 1200);
  } else {
    showToast("Usuario o contraseña incorrectos", "error");
  }
}

// ====================== LOGOUT ======================
function logout() {
  if (confirm("¿Cerrar sesión?")) {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("logged");
    showToast("Sesión cerrada", "info");
    setTimeout(() => window.location.href = "index.html", 1000);
  }
}

// ====================== Verificar login ======================
function isLoggedIn() {
  return localStorage.getItem("currentUser") !== null;
}