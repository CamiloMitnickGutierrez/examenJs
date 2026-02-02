
// servicio para crear un usuario
export const createUser = async (user) =>{

try {

    const data = await fetch ('http://localhost:3050/users',{

        method: "POST",
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(user)
    })

    if(!data.ok){

        throw new Error("Error en la peticion");
        

    }
    
} catch (error) {

    console.log("hubo error en el post",error)
    
}

}

//servicio para buscar el user en la db para l utenticacion
export const authUser = async (email,password) => {

    const url = `http://localhost:3050/users?email=${email}&password=${password}`

    try {

        const data = await fetch(url)

        if(!data.ok){
            throw new Error("Error al buscarlo o servidor");
            
        }

        const user = await data.json()

        //retorna si no hay user es null

        return user.length > 0 ? user[0] : null
        
    } catch (error) {

        console.log("error de autenticacion",error)

        return null
        
    }
    



}

