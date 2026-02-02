import { updateTask, loadTask} from "../api/services/task.service.js";
import { getIdUser } from "../utils/persistence.js";

export const EditTask = () => {
    return {
        render: () => `
        <div class="container mt-5">
            <div class="row justify-content-center">
                <div class="col-lg-6 col-md-8">
                    <div class="card shadow border-0">
                        <div class="card-header bg-dark text-white py-3">
                            <h3 class="m-0 fw-bold text-center">Editar Tarea</h3>
                        </div>
                        <div class="card-body p-4">
                            <form id="form-editar-tarea">
                                <div class="mb-3">
                                    <label class="form-label fw-bold">Nombre de la tarea</label>
                                    <input type="text" class="form-control" id="edit-nombre" required>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label fw-bold">Descripción</label>
                                    <textarea class="form-control" id="edit-descripcion" rows="3" required></textarea>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label fw-bold">Fecha de entrega</label>
                                    <input type="date" class="form-control" id="edit-fecha" required>
                                </div>
                                <div class="d-grid gap-2 mt-4">
                                    <button type="submit" class="btn btn-warning">
                                        Actualizar Tarea
                                    </button>
                                    <a href="#/tasks" class="btn btn-outline-secondary">Cancelar</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `,

        loadRender: async () => {
            const taskId = localStorage.getItem('editTaskId');
            const userId = getIdUser();
            const form = document.getElementById("form-editar-tarea");

            if (!taskId) {
                alert("No se seleccionó ninguna tarea para editar.");
                window.location.hash = "/tasks";
                return;
            }

            
            try {
              
                const tareas = await loadTask(userId);
                const tareaActual = tareas.find(t => t.id == taskId);

                if (tareaActual) {
                    document.getElementById("edit-nombre").value = tareaActual.nameTask;
                    document.getElementById("edit-descripcion").value = tareaActual.descriptionTask;
                    document.getElementById("edit-fecha").value = tareaActual.dateTask;
                } else {
                    throw new Error("Tarea no encontrada");
                }
            } catch (error) {
                console.error("Error al cargar datos:", error);
                alert("Error al obtener los datos de la tarea.");
                window.location.hash = "/tasks";
            }

      
            form.addEventListener("submit", async (e) => {
                e.preventDefault();

                const datosActualizados = {
                    nameTask: document.getElementById("edit-nombre").value,
                    descriptionTask: document.getElementById("edit-descripcion").value,
                    dateTask: document.getElementById("edit-fecha").value
                };

                try {
                    const exito = await updateTask(taskId, datosActualizados);
                    if (exito) {
                        alert("¡Tarea actualizada correctamente!");
                        localStorage.removeItem('editTaskId'); 
                        window.location.hash = "#/tasks";
                    }
                } catch (error) {
                    alert("Error al actualizar la tarea.");
                }
            });
        }
    };
};