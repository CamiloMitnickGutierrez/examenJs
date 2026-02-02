import { createTask } from "../api/services/task.service.js"
import { getIdUser } from "../utils/persistence.js"

export const NewTask= () =>{

    return{ 

        render: () => `
        <div class="container mt-5">
            <div class="row justify-content-center">
                <div class="col-lg-6 col-md-8">
                    <div class="d-sm-flex justify-content-between align-items-center mb-4">
                        <h3 class="text-dark mb-0">Crear Nueva Tarea</h3>
                    </div>
                    <div class="card shadow mb-4">
                        <div class="card-body">
                            <form id="form-crear-tarea">
                                <div class="mb-3">
                                    <label for="nombre" class="form-label">Nombre de la tarea</label>
                                    <input type="text" class="form-control" id="nombre" required>
                                </div>
                                <div class="mb-3">
                                    <label for="descripcion" class="form-label">Descripción de la tarea</label>
                                    <textarea class="form-control" id="descripcion" rows="3" required></textarea>
                                </div>
                                <div class="mb-3">
                                    <label for="fecha" class="form-label">Fecha de entrega</label>
                                    <input type="date" class="form-control" id="fecha" required>
                                </div>
                                <div class="d-grid gap-2">
                                    <button type="submit" class="btn btn-success">
                                        <i class="fas fa-save me-2"></i>Guardar Tarea
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
    loadRender: () =>{

        const form  = document.getElementById("form-crear-tarea")

        if ( form){

            form.addEventListener("submit", async (e) =>{

                e.preventDefault()

                try {

                    const newTask = {

                        nameTask:document.getElementById("nombre").value,
                        descriptionTask:document.getElementById("descripcion").value,
                        dateTask:document.getElementById("fecha").value,
                        userId:parseInt(getIdUser()),
                        status:"pendiente"

                    }

                    await createTask(newTask)

                    alert("Tarea registrada con exito")

                    window.location.hash = "#/tasks"
                    
                } catch (error) {

                    console.log("hubo error en el post",error)
                    
                }
            })
        }


    }

}
}

   

