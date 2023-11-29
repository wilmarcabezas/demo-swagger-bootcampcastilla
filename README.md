# Demo Swagger Bootcamp Castilla
Agradecimiento muy especial al desarrollador Yorleder Gomez [(https://github.com/zFr0st2](https://github.com/zFr0st2) por publicar el repositorio con la explicacion del uso de Multer https://github.com/zFr0st2/multer-express-files <br>
Este repositorio contiene una aplicación de demostración que integra Express, Swagger, Node.js, y Multer, siguiendo los principios SOLID. 🚀

## Contenido 📚

- [Demo Swagger Bootcamp Castilla](#demo-swagger-bootcamp-castilla)
  - [Contenido 📚](#contenido-)
  - [Introducción](#introducción)
  - [Tecnologías Utilizadas](#tecnologías-utilizadas)
    - [Express.js 🛤️](#expressjs-️)
    - [Swagger 📜](#swagger-)
    - [Node.js 🟢](#nodejs-)
    - [Multer 📦](#multer-)
  - [Principios SOLID 🏗️](#principios-solid-️)
  - [Cómo Empezar](#cómo-empezar)
  - [Documentación API: SWAGGER](#documentación-api-swagger)
    - [Explicación del Archivo `swagger.js` 📄](#explicación-del-archivo-swaggerjs-)
      - [Importaciones 📤](#importaciones-)
      - [Creación de la Especificación Swagger 📃](#creación-de-la-especificación-swagger-)
      - [Función de Configuración de Documentación 🚀](#función-de-configuración-de-documentación-)
      - [Exportación 📤](#exportación-)
  - [Endpoint: `/upload/{id}`](#endpoint-uploadid)
    - [Método HTTP: `POST`](#método-http-post)
    - [Resumen](#resumen)
    - [Parámetros](#parámetros)
    - [Cuerpo de la Solicitud (Request Body)](#cuerpo-de-la-solicitud-request-body)
    - [Respuestas](#respuestas)
  - [Contribuir](#contribuir)
  - [Licencia](#licencia)

## Introducción

Este proyecto es una demostración práctica para el Bootcamp Castilla, mostrando cómo implementar una API RESTful usando tecnologías modernas como Node.js, Express, y Swagger. 🌐

## Tecnologías Utilizadas

### Express.js 🛤️

Express.js es un framework de aplicaciones web para Node.js. Es utilizado para construir APIs y aplicaciones web de manera rápida y fácil.

### Swagger 📜

Swagger es una herramienta para diseñar, construir, documentar, y utilizar servicios web RESTful. Permite documentar la API de forma clara y estructurada.

### Node.js 🟢

Node.js es un entorno de ejecución para JavaScript construido con el motor de JavaScript V8 de Chrome. Es usado para desarrollar aplicaciones del lado del servidor.

### Multer 📦

Multer es un middleware para Express.js que facilita la subida de archivos.

## Principios SOLID 🏗️

Este proyecto sigue los principios SOLID para garantizar un código limpio y mantenible. Estos principios son:

1. **S**ingle Responsibility Principle (Principio de Responsabilidad Única)
2. **O**pen/Closed Principle (Principio de Abierto/Cerrado)
3. **L**iskov Substitution Principle (Principio de Sustitución de Liskov)
4. **I**nterface Segregation Principle (Principio de Segregación de la Interfaz)
5. **D**ependency Inversion Principle (Principio de Inversión de Dependencias)

## Cómo Empezar

Instrucciones sobre cómo configurar, instalar dependencias, y ejecutar el proyecto.

```git clone https://github.com/wilmarcabezas/demo-swagger-bootcampcastilla.git```<br>
```cd demo-swagger-bootcampcastilla```<br>
```npm install```<br>
```node app.js ```
<br>
<br>

## Documentación API: SWAGGER

### Explicación del Archivo `swagger.js` 📄

Este archivo `swagger.js` se utiliza para configurar la documentación de Swagger en un proyecto Node.js usando Express. A continuación, se detalla su contenido y funcionalidad:


#### Importaciones 📤

```javascript
const swaggerJSDOC = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
````

Estas líneas importan dos módulos esenciales:

```swagger-jsdoc```: Genera especificaciones de Swagger/OpenAPI a partir de comentarios JSDoc en el código.<br>
```swagger-ui-express```: Sirve la interfaz de usuario de Swagger para visualizar la documentación generada.


```javascript
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Api Multer Castilla",
            version: "1.0.0",
        }
    },
    apis: ['./app.js']
}
```
En esta sección se definen las opciones de configuración de Swagger:

```definition```: Contiene metadatos como la versión de OpenAPI y la información de la API.<br>
```apis```: Un array que indica los archivos donde Swagger buscará para generar la documentación.

#### Creación de la Especificación Swagger 📃

```const swaggerSpec = swaggerJSDOC(options);```<br>
Aquí se crea la especificación de Swagger utilizando las opciones definidas anteriormente.

#### Función de Configuración de Documentación 🚀
``` javascript
const swaggerDocs = (app, port) => {
    app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}

```

Esta función configura un middleware en la aplicación Express para servir la documentación de Swagger. La documentación estará disponible en la ruta /doc.


#### Exportación 📤
``` javascript
module.exports = { swaggerDocs }

```

Finalmente, se exporta la función swaggerDocs para su uso en otras partes de la aplicación.

<br>
<br>

### Explicación de la documentacion dentro de  `app.js` 📄

El codigo que genera la rutas de documentacion debe ser puesto antes de cada endpoint.


La API está documentada utilizando Swagger, lo que facilita la comprensión y el uso de los endpoints disponibles. Puedes acceder a la documentación de la API navegando a: 
[http://localhost:3001/api-docs](http://localhost:3000/api-docs)


```yaml
/** 
 * @openapi
 * /upload/{id}:
 *   post:
 *     summary: Subir un archivo
 *     description: Sube un archivo y actualiza un recurso (tabla!) en la base de datos.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: El ID que identifica la obra a actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Fotografía que se va a subir.
 *     responses:
 *       '201':
 *         description: Archivo subido con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 id:
 *                   type: integer
 *                 query:
 *                   type: string
 *       '500':
 *         description: Error del servidor.
 */
```

La siguiente sección documenta el endpoint `/upload/{id}` de nuestra API, utilizando la especificación de Swagger.

## Endpoint: `/upload/{id}`

### Método HTTP: `POST`

Este endpoint permite la subida de archivos al servidor y actualiza un recurso específico en la base de datos.

### Resumen

- **Sumario**: Subir un archivo.
- **Descripción**: Sube un archivo y actualiza un recurso (tabla) en la base de datos.

### Parámetros

- **ID (en ruta)**: 
  - **Ubicación**: en la ruta (path).
  - **Nombre**: `id`.
  - **Requerido**: Sí.
  - **Tipo**: Entero.
  - **Descripción**: El ID identifica el recurso específico a actualizar.

### Cuerpo de la Solicitud (Request Body)

- **Requerido**: Sí.
- **Tipo de Contenido**: `multipart/form-data`.
- **Esquema**:
  - **Tipo**: Objeto.
  - **Propiedades**:
    - **file**:
      - **Tipo**: Cadena (string).
      - **Formato**: binario.
      - **Descripción**: Fotografía que se va a subir.

### Respuestas

- **201 - Archivo subido con éxito**:
  - **Descripción**: Indica que el archivo se ha subido correctamente.
  - **Contenido**:
    - **Tipo de Contenido**: `application/json`.
    - **Esquema**:
      - **Tipo**: Objeto.
      - **Propiedades**:
        - **message**: Mensaje de confirmación.
        - **id**: ID del recurso actualizado.
        - **query**: Detalles de la consulta realizada.
- **500 - Error del servidor**:
  - **Descripción**: Indica un error del lado del servidor al intentar subir el archivo.


Esta URL te llevará a una interfaz de usuario interactiva donde podrás ver y probar los diferentes endpoints de la API.

## Contribuir

¡Tus contribuciones son bienvenidas! Si tienes sugerencias o mejoras, por favor:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/miNuevaCaracteristica`).
3. Haz tus cambios y haz commit (`git commit -am 'Añadir alguna característica'`).
4. Push a la rama (`git push origin feature/miNuevaCaracteristica`).
5. Crea un nuevo Pull Request.

Antes de enviar tu Pull Request, asegúrate de que tu código sigue los estándares establecidos y pasa todas las pruebas.

## Licencia

Este proyecto está licenciado bajo la Licencia [NOMBRE DE LA LICENCIA] - ver el archivo [LICENSE.md](LICENSE.md) para detalles.
