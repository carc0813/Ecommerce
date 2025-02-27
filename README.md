# **Proyecto Individual - eCommerce**

## **Objetivos del Proyecto**
- Construir una **App de eCommerce** utilizando **React, Redux, Node.js y Sequelize**.
- Conectar y reforzar conocimientos adquiridos en el desarrollo full stack.
- Aplicar mejores prácticas y flujos de trabajo con Git.
- Implementar un sistema de autenticación y gestión de productos.

---

## **Requerimientos mínimos**

### **Frontend (React + Redux)**
- **Landing Page** con una imagen representativa y un botón para entrar al home.
- **Home con listado de productos**, incluyendo:
  - Imagen, nombre, precio y categoría.
  - Paginado (15 productos por página).
  - **Búsqueda** de productos por nombre.
  - **Filtrado** por categoría y precio.
  - **Ordenamiento** ascendente/descendente por precio y nombre.
- **Detalle de producto**, mostrando:
  - Imagen, descripción, precio, stock y opciones de compra.
- **Carrito de compras** con opciones para:
  - Agregar/quitar productos.
  - Ver resumen del pedido.
  - Proceder al checkout.
- **Formulario de registro e inicio de sesión** con validaciones.

---

### **Backend (Node.js + Express + Sequelize + PostgreSQL)**
- **Rutas principales:**
  - `GET /products` → Lista todos los productos (paginado).
  - `GET /products?name=` → Búsqueda de productos por nombre.
  - `GET /products/:id` → Detalle de un producto.
  - `POST /products` → Crea un nuevo producto.
  - `PUT /products/:id` → Modifica un producto.
  - `DELETE /products/:id` → Elimina un producto.
  - `POST /users/register` → Crea un usuario nuevo.
  - `POST /users/login` → Autentica un usuario.
  - `POST /orders` → Crea una orden de compra.
  - `GET /orders/:userId` → Muestra el historial de compras de un usuario.

---

### **Base de datos**
- **User** *(id, nombre, email, contraseña, dirección).*
- **Product** *(id, nombre, descripción, precio, stock, imagen, categoría).*
- **Order** *(id, userId, total, status, fecha).*
- **OrderDetail** *(id, orderId, productId, cantidad, subtotal).*

---

## **Extras (Opcionales)**
- **Integrar pasarela de pago** *(Stripe o MercadoPago).*
- **Dashboard de administrador** para gestionar productos y usuarios.
- **Reviews de productos** con comentarios y calificaciones.


