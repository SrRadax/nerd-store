// js/pago.js - Procesamiento de pago (versión final)

function processPayment() {
  const cardNumber = document.getElementById("cardNumber").value.trim().replace(/\s/g, '');
  const cardName = document.getElementById("cardName").value.trim();
  const expiry = document.getElementById("expiry").value.trim();
  const cvv = document.getElementById("cvv").value.trim();

  // Validaciones básicas
  if (!cardNumber || !cardName || !expiry || !cvv) {
    showToast("Por favor completa todos los datos de la tarjeta", "error");
    return;
  }

  if (cardNumber.length < 16) {
    showToast("El número de tarjeta debe tener 16 dígitos", "error");
    return;
  }

  if (cvv.length < 3) {
    showToast("El CVV debe tener al menos 3 dígitos", "error");
    return;
  }

  // Simular proceso de pago
  const btn = document.querySelector("button");
  const originalText = btn.textContent;

  btn.disabled = true;
  btn.textContent = "Procesando pago...";

  setTimeout(() => {
    // Guardar que el pago fue exitoso
    localStorage.setItem("paymentSuccess", "true");

    showToast("¡Pago realizado con éxito! 🎉", "success");

    // Redirigir al comprobante
    setTimeout(() => {
      window.location.href = "comprobante.html";
    }, 1800);
  }, 1600);
}