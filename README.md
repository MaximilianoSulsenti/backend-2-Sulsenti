# Backend - Sulsenti Ecommerce 🛒

## Descripción del Proyecto

Este es un servidor backend desarrollado con **Node.js** y **Express.js** para una plataforma de ecommerce completa. El proyecto implementa un sistema robusto de gestión de productos, carrito de compras, usuarios y autenticación segura, con características avanzadas como Socket.io para actualizaciones en tiempo real y recuperación de contraseña por email.

## 🎯 Características Principales

- ✅ **Autenticación segura** con Passport.js (Local y JWT)
- ✅ **Gestión de productos** con paginación
- ✅ **Carrito de compras** persistente
- ✅ **Gestión de usuarios** con roles (admin, usuario)
- ✅ **Recuperación de contraseña** por email
- ✅ **Productos en tiempo real** con Socket.io
- ✅ **Base de datos MongoDB** escalable
- ✅ **Vistas con Handlebars** para renderizado del lado del servidor
- ✅ **Validación de datos** en DTOs
- ✅ **Tests unitarios** con Mocha y Chai

## 📋 Requisitos Previos

- **Node.js** (v16 o superior)
- **MongoDB** (local o Atlas)
- **npm** o **yarn**
- Cuenta de email configurada para Nodemailer (Gmail, Outlook, etc.)

## 🚀 Instalación

### 1. Clona el repositorio
```bash
git clone https://github.com/MaximilianoSulsenti/backend-2-Sulsenti.git
cd backend-2-Sulsenti
```

### 2. Instala las dependencias
```bash
npm install
```

### 3. Configura las variables de entorno
Crea un archivo `.env` en la raíz del proyecto:

```env
# Base de datos
MONGO_URI=mongodb+srv://<usuario>:<contraseña>@cluster.mongodb.net/<baseDatos>

# Servidor
PORT=8080
SECRET_KEY=tu_clave_secreta_muy_segura

# Email (Nodemailer)
MAIL_USER=tu_email@gmail.com
MAIL_PASS=tu_contraseña_de_aplicacion
MAIL_FROM=noreply@sulsenti.com

# URL del backend
BACKEND_URL=http://localhost:8080
```

### 4. Inicia el servidor en desarrollo
```bash
npm run dev
```

El servidor estará disponible en `http://localhost:8080`

## 📁 Estructura del Proyecto

```
src/
├── app.js                    # Configuración principal de Express
├── config/
│   ├── environment.js        # Variables de entorno
│   ├── passport.js           # Estrategias de autenticación
│   └── database/
│       └── mongoConnection.js # Conexión a MongoDB
├── controllers/              # Lógica de negocio de rutas
│   ├── products.controller.js
│   ├── carts.controller.js
│   ├── users.controller.js
│   └── passwordReset.controller.js
├── dao/                      # Acceso a datos (Data Access Objects)
│   └── mongo/
│       ├── products.dao.js
│       ├── carts.dao.js
│       ├── users.dao.js
│       └── passwordReset.dao.js
├── dto/                      # Data Transfer Objects (validación)
│   ├── createUser.dto.js
│   ├── updateUser.dto.js
│   ├── currentUser.dto.js
│   └── user.dto.js
├── middlewares/              # Middlewares personalizados
│   ├── auth.js              # Autenticación
│   └── ownership.js         # Verificación de propiedad
├── models/                   # Esquemas de Mongoose
│   ├── user.model.js
│   ├── product.model.js
│   ├── cart.model.js
│   └── passwordReset.model.js
├── repositories/             # Capa de repositorio
│   ├── users.repository.js
│   ├── products.repository.js
│   ├── carts.repository.js
│   └── passwordReset.repository.js
├── routes/                   # Definición de rutas
│   ├── user.route.js
│   ├── product.route.js
│   ├── cart.route.js
│   ├── sessions.route.js
│   ├── passwordReset.route.js
│   └── view.route.js
├── services/                 # Lógica de negocio
│   ├── user.service.js
│   ├── product.service.js
│   ├── cart.service.js
│   ├── mail.service.js
│   └── passwordReset.service.js
├── utils/                    # Funciones auxiliares
│   ├── hash.js              # Hash de contraseñas
│   └── jwt.js               # Tokens JWT
└── views/                    # Vistas Handlebars
    ├── home.handlebars
    ├── products.handlebars
    ├── cart.handlebars
    ├── realtimeproducts.handlebars
    └── layouts/
        └── main.handlebars
```

## 🔌 Endpoints Principales

### 👥 Usuarios
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `POST` | `/api/users/register` | Registrar nuevo usuario |
| `PUT` | `/api/users/update` | Actualizar perfil de usuario |
| `GET` | `/api/users` | Listar usuarios (admin) |
| `PUT` | `/api/users/:id` | Actualizar usuario (admin) |
| `DELETE` | `/api/users/:id` | Eliminar usuario (admin) |

### 🛍️ Productos
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/products` | Listar productos con paginación |
| `GET` | `/api/products/:id` | Obtener producto por ID |
| `POST` | `/api/products` | Crear nuevo producto (admin) |
| `PUT` | `/api/products/:id` | Actualizar producto (admin) |
| `DELETE` | `/api/products/:id` | Eliminar producto (admin) |

### 🛒 Carrito
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/carts/:cid` | Obtener carrito |
| `POST` | `/api/carts/:cid/products/:pid` | Agregar producto al carrito |
| `PUT` | `/api/carts/:cid` | Actualizar carrito |
| `DELETE` | `/api/carts/:cid/products/:pid` | Eliminar producto del carrito |
| `DELETE` | `/api/carts/:cid` | Vaciar carrito |

### 🔐 Recuperación de Contraseña
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `POST` | `/api/password/forgot` | Solicitar recuperación de contraseña |
| `POST` | `/api/password/reset` | Restablecer contraseña |
| `GET` | `/api/password/verify/:token` | Verificar token de recuperación |

### 🔑 Sesiones
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `POST` | `/api/sessions/login` | Iniciar sesión con sesiones |
| `GET` | `/api/sessions/logout` | Cerrar sesión |
| `GET` | `/api/sessions/current` | Obtener usuario actual |


## 🛠️ Scripts Disponibles

```bash
# Iniciar en modo desarrollo (con nodemon)
npm run dev

# Ejecutar tests
npm run test1

# Ejecutar tests con timeout de 10 segundos
npm run test
```

## 🗄️ Variables de Entorno

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `MONGO_URI` | URI de conexión a MongoDB | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `PORT` | Puerto del servidor | `8080` |
| `SECRET_KEY` | Clave secreta para JWT | `mi_clave_super_secreta` |
| `MAIL_USER` | Email para enviar correos | `tu_email@gmail.com` |
| `MAIL_PASS` | Contraseña de aplicación | `contraseña_de_app` |
| `MAIL_FROM` | Email remitente | `noreply@sulsenti.com` |
| `BACKEND_URL` | URL base del backend | `http://localhost:8080` |

## 💻 Tecnologías Utilizadas

### Backend
- **Express.js** - Framework web
- **Node.js** - Runtime de JavaScript
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB

### Autenticación
- **Passport.js** - Autenticación
- **JWT** - Tokens de autenticación
- **bcrypt** - Hash de contraseñas

### Frontend
- **Handlebars** - Templates del servidor
- **Socket.io** - Comunicación en tiempo real

### Utilidades
- **Nodemailer** - Envío de emails
- **Multer** - Carga de archivos
- **CORS** - Control de origen cruzado
- **dotenv** - Gestión de variables de entorno

### Testing
- **Mocha** - Framework de testing
- **Chai** - Assertions
- **Supertest** - Testing de HTTP

## 🔒 Seguridad

- ✅ Contraseñas hasheadas con bcrypt
- ✅ Autenticación con JWT
- ✅ Validación de datos con DTOs
- ✅ Verificación de propiedad de recursos
- ✅ Control de roles (admin/usuario)
- ✅ CORS configurado
- ✅ Variables de entorno seguras

## 📝 Funcionalidades Adicionales

### Socket.io - Productos en Tiempo Real
El servidor utiliza Socket.io para actualizar la lista de productos en tiempo real. Cuando un admin crea o elimina un producto, todos los clientes conectados recibirán la actualización automáticamente.

### Recuperación de Contraseña
Los usuarios pueden solicitar la recuperación de contraseña mediante email. El sistema envía un enlace con token JWT válido por un tiempo limitado.

### Paginación
Al listar productos se implementa paginación automática con `mongoose-paginate-v2` para mejorar el rendimiento.

## 🤝 Estructura de Capas

El proyecto sigue la arquitectura de capas (Layer Architecture):

1. **Routes** - Definición de endpoints
2. **Controllers** - Lógica de las rutas
3. **Services** - Lógica de negocio
4. **Repositories** - Acceso a datos
5. **DAOs** - Operaciones de base de datos
6. **Models** - Esquemas de Mongoose

## 📝 Notas de Desarrollo

- El proyecto usa **ES Modules** (import/export)
- Se incluye **nodemon** para reinicio automático en desarrollo
- Los datos se validan con **DTOs** antes de procesarse
- Se utiliza **Singleton** para la conexión a MongoDB
- Socket.io está configurado para actualizaciones reactivas

## 📧 Contacto y Soporte

Para preguntas o problemas, contacta con el equipo de desarrollo.

---

**Versión:** 1.0.0  
**Autor:** Sulsenti  
**Licencia:** ISC  
**Última actualización:** Febrero 2026
