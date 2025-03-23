const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

// Habilitar CORS para permitir solicitudes desde el navegador
app.use(cors());

// Middleware para procesar datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));

// Servir archivos estáticos (asegúrate de que `public` contiene tu index.html)
app.use(express.static(path.join(__dirname, "public")));

// Ruta para procesar el formulario
app.post("/guardar", (req, res) => {
    const { nombre, correo, mensaje } = req.body;

    if (!nombre || !correo || !mensaje) {
        return res.status(400).send("Todos los campos son obligatorios");
    }

    const data = `Nombre: ${nombre}\nCorreo: ${correo}\nMensaje: ${mensaje}\n\n`;

    fs.appendFile("formularios.txt", data, (err) => {
        if (err) {
            return res.status(500).send("Error al guardar los datos");
        }
        res.send("Datos guardados correctamente");
    });
});

// Iniciar servidor
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
