import { getEmail, getName, getRole, sesionLogout } from "../utils/persistence.js"


export const PerfilPage = () =>{


    return{

             render: () =>
            `
         <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4 shadow">
            <div class="container">
                <a class="navbar-brand fw-bold">Multi Task</a>
                <a class="navbar-brand fw-bold"> Perfil </a>
                <button type="button" id="btn-cerrar-sesion" class="btn btn-danger">Cerrar sesion</button>
               
            </div>
        </nav>

        <div class="container mt-5">
                <div class="row justify-content-center">
                    <div class="col-md-6">
                        <div class="card shadow-lg border-0">
                            <div class="card-header bg-dark text-white text-center py-4">
                                <div class="mb-3">
                                    <i class="bi bi-person-circle" style="font-size: 4rem;"></i>
                                </div>
                                <h3 id="perfil-nombre" class="mb-0 text-capitalize"></h3>
                                <span id="perfil-rol" class="badge bg-warning"></span>
                            </div>
                            <div class="card-body p-4">
                                <div class="mb-4">
                                    <label class="text-muted small d-block">Correo Electrónico</label>
                                    <h5 id="perfil-correo" class="fw-bold">---</h5>
                                   
                                </div>
                                <label class="text-muted small d-block">ROL</label>
                                
                                 <h4 id="rol" class="fw-bold text-success"></h4>
                                
                                
                                <div class="mt-4 d-grid gap-2">
                                    <a href="#/tasks" class="btn btn-outline-dark">
                                        <i class="bi bi-clock-history"></i> Ver Mis Tareas
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
        
        
        `,
        loadRender: ()=>{

            const name = getName()

            const email = getEmail()

            const rol = getRole()

            const btnLogout = document.getElementById("btn-cerrar-sesion")

            btnLogout.addEventListener("click",(e)=>{

                e.preventDefault()
                sesionLogout()
            })

            document.getElementById("perfil-nombre").innerText = `Hola, ${name}`

            document.getElementById("perfil-correo").innerText = `${email}`

            document.getElementById("rol").innerText = `${rol}`

            




        }




    }
}