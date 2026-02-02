import { getIdUser, sesionLogout } from "../utils/persistence.js";
import { loadTask, deleteTask, updateTask } from "../api/services/task.service.js";

export const TaskPage = () => {
    return {
        render: () => `
        <nav class="navbar navbar-dark bg-dark mb-4 shadow">
            <div class="container">
                <span class="navbar-brand fw-bold text-white">Multi Task</span>
                <a class="navbar-brand fw-bold" href="#/perfilUser"> Perfil </a>
                
                <button id="btn-cerrar-sesion" class="btn btn-danger btn-sm">Salir</button>
            </div>
        </nav>
        <div class="container">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h2 class="fw-bold">Mis Tareas</h2>
                <a href="#/newtask" class="btn btn-primary shadow-sm">Nueva Tarea</a>
            </div>
            <div id="contenedor-tareas" class="row"></div>
        </div>`,

        loadRender: async () => {
            const userId = getIdUser();
            const contenedor = document.getElementById("contenedor-tareas");

            const mostrarLista = async () => {
                const tareas = await loadTask(userId);

                if (tareas.length === 0) {
                    contenedor.innerHTML = `<p class="text-center mt-5 text-muted">No hay tareas pendientes.</p>`;
                    return;
                }

                contenedor.innerHTML = tareas.map(t => {
                    const config = {
                        "pendiente": "border-warning",
                        "en progreso": "border-primary",
                        "completada": "border-success"
                    };
                    const borderClase = config[t.status] || "border-secondary";

                    return `
                    <div class="col-md-6 col-lg-4 mb-3">
                        <div class="card h-100 shadow-sm border-start border-4 ${borderClase}">
                            <div class="card-body">
                                <h5 class="fw-bold text-truncate">${t.nameTask}</h5>
                                <p class="text-muted small text-truncate">${t.descriptionTask}</p>
                                
                                <div class="mb-3">
                                    <label class="form-label small fw-bold text-uppercase text-muted">Cambiar Estado:</label>
                                    <select class="form-select form-select-sm select-status bg-white" data-id="${t.id}">
                                        <option value="pendiente" style="background-color: white; color: black;" ${t.status === 'pendiente' ? 'selected' : ''}>
                                            Pendiente
                                        </option>
                                        <option value="en progreso" style="background-color: white; color: black;" ${t.status === 'en progreso' ? 'selected' : ''}>
                                            En progreso
                                        </option>
                                        <option value="completada" style="background-color: white; color: black;" ${t.status === 'completada' ? 'selected' : ''}>
                                            Completada
                                        </option>
                                    </select>
                                </div>

                                <div class="d-flex justify-content-end gap-2">
                                    <button class="btn btn-sm btn-primary btn-editar" data-id="${t.id}">
                                        <i class="bi bi-pencil"></i> Editar
                                    </button>
                                    <button class="btn btn-sm btn-danger btn-eliminar shadow-sm" data-id="${t.id}">
                                        <i class="bi bi-trash"></i> Borrar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>`;
                }).join('');

               
                document.querySelectorAll('.select-status').forEach(select => {
                    select.onchange = async (e) => {
                        const nuevoEstado = e.target.value;
                        const taskId = select.dataset.id;
                        const exito = await updateTask(taskId, { status: nuevoEstado });
                        if (exito) {
                            mostrarLista(); 
                        }
                    };
                });

               
                document.querySelectorAll('.btn-eliminar').forEach(btn => {
                    btn.onclick = async () => {
                        if (confirm("¿Deseas eliminar esta tarea?")) {
                            await deleteTask(btn.dataset.id);
                            mostrarLista();
                        }
                    };
                });

               
                document.querySelectorAll('.btn-editar').forEach(btn => {
                    btn.onclick = () => {
                        localStorage.setItem('editTaskId', btn.dataset.id);
                        window.location.hash = "/edit-task";
                    };
                });
            };

            document.getElementById("btn-cerrar-sesion").onclick = () => sesionLogout();
            await mostrarLista();
        }
    };
};