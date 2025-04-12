# Aplicación vulnerable a NoSQL Injection

## Descripción
Esta es una aplicación con una vulnerabilidad de inyección NoSQL. Permite iniciar sesión utilizando MongoDB, pero no valida correctamente los datos recibidos, lo que permite evadir la autenticación usando una estructura maliciosa.

## Tecnologías utilizadas
- Node.js
- Express
- MongoDB Atlas
- HTML (Frontend simple)

## Instalación
1. Clonar el repositorio
```bash
git clone https://github.com/tu_usuario/nosql-vuln-app.git
cd nosql-vuln-app
```
2. Instalar dependencias en la carpeta `backend`
```bash
cd backend
npm install
```
3. Ejecutar el servidor
```bash
node server.js
```
4. Abrir el archivo `frontend/index.html` en tu navegador

## Prueba del ataque
Para explotar la vulnerabilidad, puedes usar esta estructura en el formulario:
- Usuario: `{"$ne": null}`
- Contraseña: `{"$ne": null}`

Esto saltará la verificación y permitirá iniciar sesión sin credenciales válidas.

## ¿Por qué funciona?
Porque el backend espera que los campos sean strings, pero como no hay validación, se acepta un objeto JSON con operadores de MongoDB (`$ne` significa "no igual"). Eso engaña a la consulta `findOne()` para que devuelva cualquier usuario.

## ¿Cómo prevenirlo?
- Validar tipos de entrada (usar validadores como Joi o express-validator)
- Nunca confiar en lo que manda el cliente
- Usar autenticación segura con tokens y hashing de contraseñas (ej: bcrypt)