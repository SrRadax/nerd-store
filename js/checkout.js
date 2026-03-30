// js/checkout.js - Datos de envío (versión final mejorada)

function continueToPayment() {
  const nombre = document.getElementById("nombre").value.trim();
  const apellido = document.getElementById("apellido").value.trim();
  const direccion = document.getElementById("direccion").value.trim();
  const ciudad = document.getElementById("ciudad").value.trim();

  // Validación
  if (!nombre || !apellido || !direccion || !ciudad) {
    showToast("Por favor completa todos los campos", "error");
    return;
  }

  // Verificar que el carrito no esté vacío
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    showToast("El carrito está vacío", "error");
    window.location.href = "cart.html";
    return;
  }

  // Guardar datos del cliente
  const orderData = {
    nombre: nombre,
    apellido: apellido,
    direccion: direccion,
    ciudad: ciudad,
    fecha: new Date().toLocaleDateString('es-ES')
  };

  localStorage.setItem("orderData", JSON.stringify(orderData));

  showToast("Datos guardados correctamente", "success");

  // Ir a la página de pago
  setTimeout(() => {
    window.location.href = "pago.html";
  }, 1200);
}