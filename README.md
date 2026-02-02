# CRUDTASK - Gestión de Tareas Académicas

CRUDTASK es una aplicación web diseñada para simular un flujo completo de gestión de tareas académicas. Utiliza herramientas modernas como **Vite**, **JSON Server** y **Concurrently** para mejorar el flujo de desarrollo y permitir el manejo de datos y interfaces dinámicas.

## Características del Proyecto

- **Autenticación simulada:** Registro de usuarios, inicio de sesión y persistencia de sesión.
- **Gestión de roles:** Separación clara entre vistas de usuario y administrador.
- **Gestión de tareas:** Listar, crear, editar y eliminar tareas.
- **Panel administrativo:** Estadísticas y supervisión global del sistema.
- **Diseño responsivo:** Construido siguiendo los estándares de UI definidos.
- **Integración de herramientas clave**:
  - **Vite**: Para el desarrollo y construcción ágil del frontend.
  - **JSON Server**: Emula una API REST para manejar operaciones backend de manera local.
  - **Concurrently**: Simplifica el inicio y ejecución simultánea del cliente (frontend) y el servidor de datos (JSON Server).

---

## Tecnologías Utilizadas

- **Frontend:**
  - HTML5, CSS3
  - Bootstrap 5
  - JavaScript s(Vanilla)
  
- **Desarrollo Local:**
  - Vite (servidor de desarrollo frontend).
  - JSON Server (API falsa para simular datos persistentes).
  - Concurrently (arreglo eficiente para ejecutar múltiples servicios simultáneamente).

- **Manejo de sesión:** LocalStorage o SessionStorage.

---

## Estructura del Proyecto

```
examenJs/
├── src/
│   ├── api/                # Lógica de interacción con la API (CRUD)
│   ├── assets/             # Recursos estáticos (imágenes, íconos, estilos)
│   ├── components/         # Componentes reutilizables de interfaz
│   ├── pages/              # Vistas principales (login, tareas, perfil, dashboard)
│   ├── routes/             # Definición de rutas gestionadas por rol
│   ├── utils/              # Métodos auxiliares (validaciones, helpers)
│   └── main.js             # Punto de entrada principal
├── dataBase.json           # Base de datos local simulada (JSON Server)
├── index.html              # Archivo HTML principal
├── package.json            # Configuración de dependencias y scripts
├── vite.config.js          # Configuración del entorno de desarrollo
└── README.md               # Este archivo
```

---

## Instalación y Configuración

tener node js
### Pasos para Ejecutar 

1. **Clonar el repositorio**:

   ```bash
   git clone https://github.com/CamiloMitnickGutierrez/examenJs.git
   cd examenJs
   ```

2. **Instalar dependencias**:

   ```bash
   npm install
   ```

3. **Ejecutar el proyecto**:

   CRUDTASK utiliza `concurrently` para ejecutar dos servicios simultáneamente:
   - **Vite**: para la interfaz de usuario en `http://localhost:5173`.
   - **JSON Server**: para la simulación de la API en `http://localhost:3050`.

   Para correr ambos servicios, ejecuta el siguiente comando:

   ```bash
   npm run dev
   ```

---

## Uso de CRUDTASK

1. Abre tu navegador y dirígete a [http://localhost:5173](http://localhost:5173).
2. Podrás realizar las siguientes acciones:
   - Usuarios (login y registro) pueden gestionar sus tareas personales.
   - Administradores pueden acceder al dashboard y supervisar toda la actividad.

---

## Configuración de Dependencias Clave

### Concurrently

`Concurrently` es una herramienta que permite ejecutar múltiples comandos en paralelo desde un único script. En CRUDTASK, se utiliza para inicializar tanto el servidor frontend (**Vite**) como el servidor backend (**JSON Server**).

```json
"scripts": {
  "dev": "concurrently \"vite\" \"json-server --watch dataBase.json --port 3050\"",
  
}
```

### JSON Server

`JSON Server` proporciona una API REST rápida, configurada con el archivo `dataBase.json`. Maneja operaciones de tipo CRUD para usuarios, tareas y roles durante el desarrollo.

- Todos los endpoints están disponibles en `http://localhost:3050`.

Ejemplo de datos (`dataBase.json`):
```json
{
  "users": [
    { "id": 1, "username": "admin", "password": "admin", "role": "admin" },
    { "id": 2, "username": "user", "password": "user", "role": "user" }
  ],
  "tasks": [
    { "id": 1, "userId": 2, "title": "Tarea 1", "status": "pending" }
  ]
}
```

### Vite

`Vite` acelera el desarrollo y construcción del proyecto frontend. Está configurado para ejecutar y construir los archivos necesarios.

---

## Funcionalidades

### Usuarios (Rol: user)

- Registro: Crear cuenta con rol asignado automáticamente.
- Login: Autenticación contra JSON Server.
- Gestión de tareas:
  - Listar tareas propias.
  - Crear, editar, eliminar y cambiar estado (pending, in progress, completed).
- Perfil: Ver información personal y cerrar sesión.

### Administradores (Rol: admin)

- Dashboard:
  - Ver estadísticas generales (tareas totales, completadas y pendientes).
- Gestión de tareas:
  - Operaciones CRUD para todas las tareas y estados.

---

## Reglas de Lógica

- Protección de vistas y rutas:
  - Usuarios deben autenticarse para acceder a vistas.
  - Las rutas están protegidas por rol.
- Validaciones estrictas:
  - Solo los usuarios con permisos pueden manipular datos.
  - Cada usuario tiene acceso restringido a su información.

---

## Elaborado por 

Camilo Mitnick Gutierrez

clan: Hamilton
