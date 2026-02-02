export const dashboardView = () => ({
render: () => {
return `
<nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4 shadow">
<div class="container">
<a class="navbar-brand fw-bold">TaskMaster Admin</a>
<button type="button" id="btn-cerrar-sesion" class="btn btn-outline-danger btn-sm">Cerrar sesión</button>
</div>
</nav>

<div class="container-fluid mt-4 px-4">
<div class="row mb-4">
<div class="col-md-3">
<div class="card shadow-sm border-0 p-3 bg-light">
<label class="text-muted small d-block text-uppercase fw-bold">Total Tareas</label>
<h2 id="total-tareas" class="fw-bold text-dark">0</h2>
</div>
</div>
<div class="col-md-3">
<div class="card shadow-sm border-0 p-3 border-start border-warning border-4">
<label class="text-muted small d-block text-uppercase fw-bold">Pendientes</label>
<h2 id="tareas-pendientes" class="fw-bold text-warning">0</h2>
</div>
</div>
<div class="col-md-3">
<div class="card shadow-sm border-0 p-3 border-start border-success border-4">
<label class="text-muted small d-block text-uppercase fw-bold">Completadas</label>
<h2 id="tareas-completadas" class="fw-bold text-success">0</h2>
</div>
</div>
<div class="col-md-3">
<div class="card shadow-sm border-0 p-3 border-start border-primary border-4">
<label class="text-muted small d-block text-uppercase fw-bold">Usuarios Totales</label>
<h2 id="total-usuarios" class="fw-bold text-primary">0</h2>
</div>
</div>
</div>

<div class="card shadow-sm border-0 p-4 mb-5">
<h5 class="mb-3">Progreso General del Sistema</h5>
<div class="progress" style="height: 25px;">
<div id="barra-progreso" class="progress-bar bg-success progress-bar-striped progress-bar-animated" role="progressbar" style="width: 0%">0%</div>
</div>
</div>

<div class="mb-4">
<h3><i class="bi bi-list-check"></i> Gestión de Tareas</h3>
</div>
<div class="card shadow-sm border-0 mb-5">
<div class="table-responsive">
<table class="table table-hover mb-0">
<thead class="table-dark">
<tr>
<th>ID</th>
<th>Título de Tarea</th>
<th>Estado</th>
<th>Acción</th>
</tr>
</thead>
<tbody id="tabla-tareas">
</tbody>
</table>
</div>
</div>

<div class="mb-4">
<h3><i class="bi bi-people-fill"></i> Usuarios Registrados</h3>
</div>
<div class="card shadow-sm border-0 mb-5">
<div class="table-responsive">
<table class="table table-hover mb-0">
<thead class="table-light">
<tr>
<th>Nombre / Username</th>
<th>Email</th>
<th>Rol</th>
</tr>
</thead>
<tbody id="tabla-usuarios">
</tbody>
</table>
</div>
</div>
</div>`;
},

cargarRender: async () => {
// Elementos de la interfaz
const tablaTareas = document.getElementById("tabla-tareas");
const tablaUsers = document.getElementById("tabla-usuarios");
const txtTotalT = document.getElementById("total-tareas");
const txtPendientes = document.getElementById("tareas-pendientes");
const txtCompletadas = document.getElementById("tareas-completadas");
const txtTotalU = document.getElementById("total-usuarios");
const barraProgreso = document.getElementById("barra-progreso");

try {
// Llamada a la API para obtener tareas y usuarios simultáneamente
const [resTareas, resUsers] = await Promise.all([
fetch('http://localhost:8080/tasks'),
fetch('http://localhost:8080/users')
]);

const tareas = await resTareas.json();
const users = await resUsers.json();

// Lógica de métricas de tareas
const totalT = tareas.length;
const completadas = tareas.filter(t => t.status === 'completada').length;
const pendientes = totalT - completadas;
const porcentaje = totalT > 0 ? Math.round((completadas / totalT) * 100) : 0;

// Mostrar métricas en pantalla
txtTotalT.textContent = totalT;
txtPendientes.textContent = pendientes;
txtCompletadas.textContent = completadas;
txtTotalU.textContent = users.length;

barraProgreso.style.width = `${porcentaje}%`;
barraProgreso.textContent = `${porcentaje}% de tareas resueltas`;

// Render de Tabla de Tareas
tablaTareas.innerHTML = tareas.map(t => `
<tr class="align-middle">
<td>#${t.id}</td>
<td class="fw-bold">${t.title}</td>
<td>
<span class="badge ${t.status === 'completada' ? 'bg-success' : 'bg-warning'}">
${t.status.toUpperCase()}
</span>
</td>
<td>
<select class="form-select form-select-sm select-status-task" data-id="${t.id}">
<option value="pendiente" ${t.status === 'pendiente' ? 'selected' : ''}>Pendiente</option>
<option value="completada" ${t.status === 'completada' ? 'selected' : ''}>Completada</option>
</select>
</td>
</tr>
`).join('');

// Render de Tabla de Usuarios (Solo visitantes/users, filtrando admins si prefieres)
tablaUsers.innerHTML = users.map(u => `
<tr class="align-middle">
<td class="text-capitalize fw-bold">${u.username || u.name}</td>
<td>${u.email}</td>
<td><span class="badge bg-info">${u.role}</span></td>
</tr>
`).join('');

} catch (error) {
console.error("Error al cargar datos:", error);
}

// Evento Cerrar Sesión
document.getElementById("btn-cerrar-sesion")?.addEventListener("click", () => cerrarSesion());

// Evento para cambiar estado de tarea (Gestión activa)
tablaTareas.addEventListener("change", async (e) => {
if (e.target.classList.contains("select-status-task")) {
const id = e.target.dataset.id;
const newStatus = e.target.value;

await fetch(`http://localhost:8080/tasks/${id}`, {
method: "PATCH",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ status: newStatus })
});

// Recargar datos para actualizar la barra de progreso automáticamente
location.reload();
}
});
}
});
