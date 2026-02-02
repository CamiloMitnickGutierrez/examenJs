import { getRole, verifySesion } from "../utils/persistence.js"
import {NotFoundPage} from "../components/NotFoundPage.js"
import { LoginPage } from "../pages/LoginPage.js"
import { RegisterPage } from "../pages/RegisterPage.js"
import { TaskPage } from "../pages/TaskPage.js"
import { DashboardPage } from "../pages/DashboardPage.js"
import {NewTask} from "../components/NewTask.js"
import { EditTask } from "../components/EditTask.js"
import { PerfilPage } from "../components/PerfilPage.js"




const routes = {
    "#/":LoginPage(),
    "#/login":LoginPage(),
    "#/register":RegisterPage(),
    "#/tasks":TaskPage(),
    "#/newtask":NewTask(),
    "#/edit-task":EditTask(),
    "#/perfilUser":PerfilPage(),
    "#/dashboard":DashboardPage()
}


export const routeManager = async () => {

    const root = document.getElementById("root")

    const verifyLogueo = verifySesion()

    const hash = window.location.hash || "#/login"

    if ((hash == "#/tasks" || hash == "#/dashboard" || hash == "#/newtask" || hash == "#/edit-task" || hash == "#/perfilUser") && !verifyLogueo){

        const notFound = NotFoundPage()

        root.innerHTML = notFound.render()

        await notFound.loadRender()

        return
    }

    const userRole = getRole()

    if (verifyLogueo){

        if ( (hash == "#/tasks" || hash == "#/newtask" || hash == "#/edit-task" || hash == "#/perfilUser") && userRole == "admin"){

            window.location.hash = "#/dashboard"
            
            return
        }
        else if (hash == "#/dashboard" && userRole == "user"){

            window.location.hash = "#/tasks"

            return 
        }
    }

    if ((hash == "#/login" || hash == "#/register" || hash == "#/") && verifyLogueo){

        window.location.hash = (userRole == "admin") ? "#/dashboard" : "#/tasks"

        return

    }

    const view = routes[hash]

    if (view){

        root.innerHTML = view.render()

        await view.loadRender()
    }
    else{
        const notFound = NotFoundPage()

        root.innerHTML = notFound.render()

        await notFound.loadRender()
    }




    
}