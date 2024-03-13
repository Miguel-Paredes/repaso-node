const express = require ('express');

const routerMatematicas = express.Router();

const { matematicas } = require('../datos/cursos.js').infoCursos;

routerMatematicas.use(express.json());

routerMatematicas.get('/',(req, res) => {
    res.json(matematicas);
});

// Crear una ruta que obtiene usa el valor de tema para buscar en el json
routerMatematicas.get('/:tema',(req,res) => {
    const tema = req.params.tema;
    const resultado = matematicas.filter(cursos => cursos.tema === tema);
    if(resultado.length === 0){
        // Devolver con mensaje
        return res.status(404).send(`No se encontro el curso de ${tema}`);
        // Devolver con pagina no encontrada comun
        // return res.status(404).end();
    }
    res.json(resultado);
})

module.exports = routerMatematicas;