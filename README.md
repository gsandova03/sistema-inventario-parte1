

# API Sistema de inventario - NestJS & TypeORM

Esta es una API REST robusta construida con **NestJS**, diseñada para gestionar categorías y productos. Incluye autenticación mediante **JWT**, persistencia en **PostgreSQL** y documentación interactiva con **Swagger**.

## 1. Requerimientos Previos

Antes de comenzar, asegúrate de tener instalado:

* [Node.js](https://nodejs.org/) (v18 o superior)
* [Docker](https://www.docker.com/) y Docker Compose
* [NPM](https://www.npmjs.com/) o Yarn

---

## 2. Instalación

1. **Clonar el repositorio:**
```bash
git clone <url-del-repositorio>
cd nombre-del-proyecto

```


2. **Instalar dependencias:**
```bash
npm install

```


3. **Configurar variables de entorno:**
Crea un archivo `.env` en la raíz del proyecto basándote en la siguiente configuración, tambien se puede usar el archivo `.env.template`:
```env
# Base de Datos
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=nestuser
DB_PASSWORD=nestpassword
DB_NAME=nestdb
DB_SYNCHRONIZE=true

# Autenticación
JWT_SECRET=tu_clave_secreta_super_segura

```



---

## 3. Ejecución de la Aplicación

### Paso 1: Levantar la Base de Datos (Docker)

Ejecuta el siguiente comando para iniciar el contenedor de PostgreSQL:

```bash
docker-compose up -d

```

### Paso 2: Iniciar la API

Puedes ejecutar la aplicación en modo desarrollo (con recarga automática):

```bash
npm run start:dev

```

---

## 4. Documentación de la API (Swagger)

Una vez que la aplicación esté corriendo, puedes acceder a la documentación interactiva en:

🔗 **[http://localhost:3000/api/docs](https://www.google.com/search?q=http://localhost:3000/api/docs)**

Desde aquí podrás:

* Visualizar todos los endpoints disponibles.
* Ver la estructura de los **DTOs** (Schemas) requeridos.
* Probar las peticiones directamente.
* Autenticarte usando el botón **Authorize** con el token JWT obtenido en el login.

---

## 5. Estructura del Proyecto

El proyecto sigue una arquitectura modular de NestJS:

```text
src/
├── auth/           # Lógica de autenticación, JWT y Estrategias
├── categories/     # Módulo de Categorías
├── products/       # Módulo de Productos
├── users/          # Módulo de Usuarios y Registro
├── main.ts         # Punto de entrada y configuración
└── app.module.ts   # Módulo raíz que integra la configuración y la DB

```

---