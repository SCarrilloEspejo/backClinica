# API REST con Autenticación JWT

API REST desarrollada con Node.js, Express y JWT para autenticación.

## 🚀 Características

- ✅ Autenticación con JWT (JSON Web Tokens)
- ✅ Registro de usuarios
- ✅ Login con usuario y contraseña
- ✅ Middleware de autenticación para rutas protegidas
- ✅ Encriptación de contraseñas con bcryptjs
- ✅ CORS habilitado
- ✅ Documentación interactiva con Swagger UI
- ✅ Arquitectura en capas (Controllers y Services)

## 📋 Requisitos previos

- Node.js (versión 14 o superior)
- npm o yarn

## 🔧 Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno:
   - Edita el archivo `.env` y cambia el `JWT_SECRET` por una clave segura

## 🏃‍♂️ Ejecutar el proyecto

### Modo desarrollo (con nodemon):
```bash
npm run dev
```

### Modo producción:
```bash
npm start
```

El servidor se iniciará en `http://localhost:3000`

## 📖 Documentación Swagger

Accede a la documentación interactiva de la API en:

**http://localhost:3000/api-docs**

Swagger UI te permite probar todos los endpoints directamente desde el navegador sin necesidad de herramientas adicionales como Postman.

## 📚 Endpoints disponibles

### Autenticación

#### 1. Registro de usuario
```
POST /api/auth/register
Content-Type: application/json

{
  "username": "usuario",
  "email": "usuario@example.com",
  "password": "contraseña123"
}
```

**Respuesta exitosa (201):**
```json
{
  "success": true,
  "message": "Usuario registrado exitosamente",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "username": "usuario",
      "email": "usuario@example.com"
    }
  }
}
```

#### 2. Login
```
POST /api/auth/login
Content-Type: application/json

{
  "username": "usuario",
  "password": "contraseña123"
}
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Login exitoso",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "username": "usuario",
      "email": "usuario@example.com"
    }
  }
}
```

#### 3. Verificar token (ruta protegida)
```
GET /api/auth/verify
Authorization: Bearer {token}
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Token válido",
  "data": {
    "user": {
      "id": 1
    }
  }
}
```

## 🔐 Usuario de prueba

Para probar el login, puedes usar:
- **Usuario:** `admin`
- **Contraseña:** `admin123`

## 🏗️ Estructura del proyecto

```
Back/
├── src/
│   ├── config/
│   │   ├── jwt.js              # Configuración de JWT
│   │   └── swagger.js          # Configuración de Swagger
│   ├── controllers/
│   │   └── auth.controller.js  # Controladores de autenticación
│   ├── middleware/
│   │   └── auth.middleware.js  # Middleware de autenticación
│   ├── models/
│   │   └── User.js             # Modelo de usuario
│   ├── routes/
│   │   └── auth.routes.js      # Rutas de autenticación (con docs Swagger)
│   ├── services/
│   │   └── auth.service.js     # Lógica de negocio de autenticación
│   └── server.js               # Archivo principal del servidor
├── .env                        # Variables de entorno
├── .gitignore
├── package.json
└── README.md
```

## 🛡️ Seguridad

- Las contraseñas se encriptan con bcryptjs antes de almacenarse
- Los tokens JWT expiran en 24 horas (configurable)
- **IMPORTANTE:** Cambia el `JWT_SECRET` en el archivo `.env` en producción

## 📝 Notas

- Este proyecto usa una simulación de base de datos en memoria
- En producción, debes conectar una base de datos real (MongoDB, PostgreSQL, MySQL, etc.)
- Recuerda actualizar el `JWT_SECRET` con una clave segura y única

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request para sugerencias o mejoras.

## 📄 Licencia

ISC
