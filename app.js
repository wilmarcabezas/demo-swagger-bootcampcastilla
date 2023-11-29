const express = require('express');
const multer = require('multer');
const path = require('path');
const {swaggerDocs: v1SwaggerDocs} = require('./swagger');

const app = express();
const port = 3001;
var fotoNueva = 'https://www.castillalanueva-meta.gov.co/sites/castillalanuevameta/content/'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destinationPath = path.join(__dirname, './files');
    cb(null, destinationPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);    
    fotoNueva+=file.originalname;
    console.log(fotoNueva);
  },
});

const upload = multer({ storage: storage });


// Para generar esta documentacion, agrega comentarios a tu endpoint y pidele a chatgpt que 
// te construya el formato de documentacion de API
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
 *                 description: Fotografia que se va a subir.
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


app.post('/upload/:id', upload.single('file'), async (req, res) => {
  try {
    let fotoNueva = req.file.filename; 
    res.status(201).send({
      message: 'Archivo subido con éxito',
      id: req.params.id,
      obra: `Se realizo la actualizacion de la Obra='${id}'`
    });
  } catch (error) {
    // Manejo de errores generales
    console.error('Error al subir el archivo:', error);
    res.status(500).send({ error: 'Error interno del servidor' });
  }
});






app.listen(port, () => {
  console.log(`Servidor iniciado`);
  v1SwaggerDocs(app, port);
});

/*

Paso a paso:
npm i swagger-jsdoc swagger-ui-express  El primero es para 
crear la documentacion, el segundo la "web"
swagger.js

node --watch app.js
*/