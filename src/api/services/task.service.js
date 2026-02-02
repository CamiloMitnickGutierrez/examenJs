

// servicio para crear tarea
export const createTask = async (newTask) =>{

    try {

        const data = await fetch('http://localhost:3050/tasks',{

            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(newTask)
        })

        if(!data.ok){

            throw new Error("Error en el post")
        }
        
    } catch (error) {

        
    }

    

}

// servicio para cargar  tareas 
export const loadTask = async(userId) =>{

    try {

        const data = await fetch(`http://localhost:3050/tasks?userId=${userId}`)

        if (!data.ok){
            
            throw new Error("Error al obtener tareas");
            
        }
        const res = await data.json()

        return res 

    } catch (error) {

        console.error(error)
        
        return []
        
    }

}

// servicio para borrar tarea

export const deleteTask = async (taskId) =>{

    try {

        const data = await fetch(`http://localhost:3050/tasks/${taskId}`,{

            method: "DELETE"
        })

        if (!data.ok){

            throw new Error("Erro al eliminar la tarea");
            
        }

        return true
   
    } catch (error) {

        console.log(error)
        
        return false
        
    }

}

//servicio para actualizar tarea

export const updateTask = async (taskId,updateData) => {

    try {

        const data = await fetch(`http://localhost:3050/tasks/${taskId}`,{

            method: "PATCH",
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(updateData)

        })

        if(!data.ok){
            throw new Error("error al actualizar");
            
        }

        return await data.json()
        
    } catch (error) {
        console.error(error)
        
    }
    
}