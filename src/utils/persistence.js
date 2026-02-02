
export const sesionStart = (user) =>{

    localStorage.setItem("user-id", user.id)

    localStorage.setItem("user-role",user.role)

    localStorage.setItem("user-name",(user.name || "").trim())

    localStorage.setItem("user-email",(user.email || "").trim())

}

export const sesionLogout = () =>{

    localStorage.clear()

    window.location.hash = "#/login"

    window.location.reload()

}

export const verifySesion = () =>{

    return localStorage.getItem("user-role") !==null
}

export const getRole = () =>{

    return localStorage.getItem("user-role")
}

export const getIdUser = () =>{
    
    return localStorage.getItem("user-id")

}

export const getName = () =>{

    return localStorage.getItem("user-name")

}

export const getEmail = () =>{

    return localStorage.getItem("user-email")
}