// js/admin.js - Panel de Administrador corregido

let orders = JSON.parse(localStorage.getItem("orders")) || [];

// Cargar y mostrar las órdenes
function loadOrders() {
  const tbody = document.getElementById("ordersBody");
  const emptyState = document.getElementById("emptyState");
  
  if (!tbody) return;

  tbody.innerHTML = "";

  if (orders.length === 0) {
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";

  orders.forEach((order, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>#${String(index + 1).padStart(4, '0')}</td>
      <td>${order.customer || "Cliente"}</td>
      <td>${order.date || new Date().toLocaleDateString('es-AR')}</td>
      <td>${order.items ? order.items.length : 1} producto(s)</td>
      <td>$${order.total || 0}</td>
      <td><span style="color:#22c55e;">Completado</span></td>
      <td>
        <button onclick="deleteOrder(${index})" style="background:#ef4444; color:white; border:none; padding:6px 12px; border-radius:6px; cursor:pointer;">
          Eliminar
        </button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// Actualizar total de ventas
function updateTotalSales() {
  const totalElement = document.getElementById("totalVentas");
  if (!totalElement) return;

  const total = orders.reduce((sum, order) => sum + (order.total || 0), 0);
  totalElement.textContent = total;
}

// Eliminar una orden
function deleteOrder(index) {
  if (confirm("¿Eliminar esta orden?")) {
    orders.splice(index, 1);
    localStorage.setItem("orders", JSON.stringify(orders));
    loadOrders();
    updateTotalSales();
    showToast("Orden eliminada", "success");
  }
}

// Limpiar todas las órdenes
function clearAllOrders() {
  if (confirm("¿Estás seguro de eliminar TODAS las órdenes?")) {
    orders = [];
    localStorage.setItem("orders", JSON.stringify(orders));
    loadOrders();
    updateTotalSales();
    showToast("Todas las órdenes han sido eliminadas", "info");
  }
}

// Función para agregar una orden
function addOrder(customerName, items, total) {
  const newOrder = {
    customer: customerName || "Cliente Anónimo",
    date: new Date().toLocaleDateString('es-AR'),
    items: items,
    total: total || 0
  };
  orders.push(newOrder);
  localStorage.setItem("orders", JSON.stringify(orders));
}