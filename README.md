# Ferramas Web

Este es el repositorio del proyecto **Ferramas Web**, desarrollado como parte del curso de **Integración de Plataformas**.

## 🌐 Descripción

Ferramas Web es una aplicación web para una cadena de ferreterías, que permite a los usuarios explorar productos por categoría, agregar productos al carrito, realizar compras mediante Webpay o transferencia bancaria, y gestionar su sesión de usuario. Este proyecto integra un frontend en React con un backend en Flask y una base de datos MySQL.

## 💡 Características

- Inicio de sesión de usuarios.
- Navegación por productos por categoría.
- Carrito de compras persistente con resumen del pedido.
- Conversión automática de moneda usando la API del Banco Central de Chile.
- Pago mediante Webpay o transferencia bancaria.
- Página de confirmación de compra.

## 🚀  Tecnologías utilizadas

- Frontend: React, Tailwind CSS, React Router, Context API.
- Backend: Python, Flask, Flask-MySQLdb, Marshmallow, Flasgger.
- Base de datos: MySQL 8.0
- Otros servicios: Webpay, API del Banco Central de Chile.

## 📁  Estructura del Proyecto

```plaintext
ferramas-web/
├── public/
├── src/
│   ├── assets/           # Recursos generales (Imagenes)
│   ├── components/       # Componentes reutilizables
│   ├── context/          # Manejo de sesión y carrito
│   ├── pages/            # Páginas principales (Home, Carrito, Login, etc.)
│   ├── services/         # Servicios como API y conversión de moneda
│   ├── styles/           # Estilos globales
│   ├── router/           # Rutas principales
│   └── main.jsx
├── package.json
└── README.md
```

## 🔧 Instalación

1. Clona este repositorio:
    ```bash
    git clone https://github.com/usuario/ferramas-web.git
    ```
2. Navega al directorio del proyecto:
    ```bash
    cd ferramas-web
    ```
3. Instala las dependencias:
    ```bash
    npm install
    ```

## ▶️ Uso

1. Inicia el servidor de desarrollo:
    ```bash
    npm run dev
    ```
2. Abre tu navegador en `http://localhost:5173`.
⚠️ Asegúrate de tener también corriendo la API Backend en http://localhost:5001.

## 🧪 Pruebas Funcionales

### 1. Visualizar Productos

Desde la página de inicio selecciona una de las categorías mostradas, lo cual te llevará a:

`http://localhost:5173/categoria/#`

### 2. Agregar productos al carrito

Haz click en el botón "Agregar al carrito" que se encuentra en cada producto. Luego selecciona el carrito en la barra de navegación para dirigirte a:

`http://localhost:5173/cart`

### 3. Conversión de moneda

En la tarjeta de cada producto se mostrará debajo del precio en CLP el precio en USD y EUR, esto usando el precio del USD y EUR actualizado al día en que se esté utilizando la app web. Esto también se mostrará para el total de la compra en el carrito.

### 4. Realizar pago con Webpay

Desde el carrito haz click en el botón "Pagar con Webpay" y serás redirigido a la interfaz de transbank. En esta utiliza los siguientes datos para realizar la prueba de pago:

Número de tarjeta: 	4051 8856 0044 6623
Fecha: Cualquier fecha posterior a la actual.
CVV: 123

Más adelante te solicitará un rut y una clave para iniciar sesión, para esto utiliza:

Rut: 11.111.111-1
Clave: 123

## 📡  Conexión con la API

El frontend consume la API desarrollada en Flask. Se espera que los endpoints estén disponibles en:

`http://localhost:5001`

## Contacto

Si tienes preguntas o sugerencias, no dudes en contactarnos en ignacio.frivera1@gmail.com.
