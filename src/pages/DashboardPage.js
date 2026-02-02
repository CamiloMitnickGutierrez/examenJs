import { sesionLogout } from "../utils/persistence.js";

export const DashboardPage = () => ({
    render: () => {
        return `
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4 shadow">
                <div class="container">
                <a class="navbar-brand fw-bold">Multi Task - ADMIN</a>
                <button type="button" id="btn-cerrar-sesion" class="btn btn-danger btn-sm">Cerrar sesión</button>
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
        <tbody id="tabla-tareas"></tbody>
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
        <tbody id="tabla-usuarios"></tbody>
            </table>
        </div>
    </div>
    </div>`;
    },
    loadRender: async () => {
        const tableTask = document.getElementById("tabla-tareas");
        const tableUsers = document.getElementById("tabla-usuarios");
        const totalTasksLabel = document.getElementById("total-tareas");
        const totalPendientsLabel = document.getElementById("tareas-pendientes");
        const taskCompletedLabel = document.getElementById("tareas-completadas");
        const totalUsersLabel = document.getElementById("total-usuarios");
        const progress = document.getElementById("barra-progreso");

        try {

            const [resUsers, resTask] = await Promise.all([
                fetch("http://localhost:3050/users"),
                fetch("http://localhost:3050/tasks"),
            ]);

            const users = await resUsers.json();
            const tasks = await resTask.json();


            const nTotalTasks = tasks.length;
            const nCompleted = tasks.filter((t) => t.status === "completada").length;
            const nPending = nTotalTasks - nCompleted;
            const percentage = nTotalTasks > 0 ? Math.round((nCompleted / nTotalTasks) * 100) : 0;

            totalTasksLabel.textContent = nTotalTasks;
            totalPendientsLabel.textContent = nPending;
            taskCompletedLabel.textContent = nCompleted;
            totalUsersLabel.textContent = users.length;


            progress.style.width = `${percentage}%`;
            progress.textContent = `${percentage}% de tareas resueltas`;


            tableTask.innerHTML = tasks
                .map((t) => `
                <tr class="align-middle">
                <td>#${t.id}</td>
                    <td class="fw-bold">${t.nameTask}</td>
                <td>
            <span class="badge ${t.status === "completada" ? "bg-success" : "bg-warning"}">
            ${t.status.toUpperCase()}
            </span>
            </td>
            <td>
            <select class="form-select form-select-sm select-status-task" data-id="${t.id}">
            <option value="pendiente" ${t.status === "pendiente" ? "selected" : ""}>Pendiente</option>
            <option value="completada" ${t.status === "completada" ? "selected" : ""}>Completada</option>
            </select>
            </td>
            </tr>`)
                .join("");
            tableUsers.innerHTML = users
                .map((u) => `
            <tr class="align-middle">
            <td class="text-capitalize fw-bold">${u.username || u.name}</td>
            <td>${u.email}</td>
            <td><span class="badge bg-info">${u.role}</span></td>
            </tr>`)
                .join("");

        } catch (error) {
            console.error("Error cargando datos:", error);
        }

        document.getElementById("btn-cerrar-sesion")?.addEventListener("click", () => sesionLogout());

        tableTask.addEventListener("change", async (e) => {
            if (e.target.classList.contains("select-status-task")) {
                const id = e.target.dataset.id;
                const newStatus = e.target.value;

                try {
                    await fetch(`http://localhost:3050/tasks/${id}`, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },

                        body: JSON.stringify({ status: newStatus }),
                    });
                    location.reload();
                } catch (error) {
                    console.error("Error al actualizar estado:", error);
                }
            }
        });
    },
});