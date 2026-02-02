import { createUser } from "../api/services/auth.service.js"

export const RegisterPage = () => ({

    render: () => {
        return `<div class="container d-flex align-items-center justify-content-center min-vh-100">
        <div class="row justify-content-center w-100">
            <div class="col-md-6 col-lg-5">
                <div class="card shadow-lg border-0">
                    <div class="card-body p-5">
                        <div class="text-center">
                            <h4 class="text-dark mb-4">Registrate</h4>
                        </div>
                        <form class="user">
                            <div class="mb-3">
                                <input class="form-control form-control-user" type="text"
                                id="name-user" placeholder="Ingrese Nombre" name="name-user">
                            </div>
                            <div class="mb-3">
                                <input class="form-control form-control-user" type="email"
                                id="email-user" placeholder="Ingrese Correo" name="email">
                            </div>
                            <div class="mb-3">
                                <input class="form-control form-control-user" type="password"
                                id="password-user" placeholder="Password" name="password">
                            </div>
                               <div class="mb-3">
                                <input class="form-control form-control-user" type="password"
                                id="confirm-password-user" placeholder="Password" name="password">
                            </div>
                          
                            <button class="btn btn-warning d-block w-100 btn-user" id="btn-register-user" type="button">Registrate</button>
                        </form>
                        
                    </div>

                </div>
            </div>
        </div>
        </div>`
    },
    loadRender: () => {

        const btnRegister = document.getElementById("btn-register-user")

        btnRegister.onclick = async (e) => {

            e.preventDefault()

            const userName = document.getElementById("name-user").value 
            const userEmail = document.getElementById("email-user").value 
            const userPass = document.getElementById("password-user").value
            const confirmPass = document.getElementById("confirm-password-user").value 

            if (!userName || !userEmail || !userPass || !confirmPass){

                alert("no puedes tener campos vacios")
                
                return
            }

            if (userPass !== confirmPass){

                alert("Las claves no coinciden verificalas")

                return
            }

            const newUser = {
                name:userName,
                email:userEmail,
                password:userPass,
                role:"user"
            }

            await createUser(newUser)
            
            alert("Usuario Creado con exito")

            window.location.hash = "#/login"

        }

    }
})