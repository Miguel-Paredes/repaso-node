const express = require ('express');

const routerProgramacion = express.Router();

const { programacion } = require('../datos/cursos.js').infoCursos;

// Middleware
// Se ejecutan depues de recibir una solicitud y antes de enviar una respuesta
routerProgramacion.use(express.json());

routerProgramacion.get('/',(req, res) => {
    res.json(programacion);
});

// Parametros de busqueda
// Crear una ruta que obtiene usa el valor de lenguaje para buscar en el json
routerProgramacion.get('/:lenguaje',(req, res) => {
    const lenguaje = req.params.lenguaje;
    const resultado = programacion.filter(curso => curso.lenguaje === lenguaje);
    if(resultado.length === 0){
        return res.status(404).send(`No se encontraron cursos de ${lenguaje}`);
    }
    res.json(resultado);
});

routerProgramacion.get('/:lenguaje/:nivel',(req,res) => {
    const lenguaje = req.params.lenguaje;
    const nivel = req.params.nivel;
    const resultado = programacion.filter(cursos => cursos.lenguaje === lenguaje && cursos.nivel === nivel);
    if(resultado.length === 0){
        return res.status(404).send(`No se encontraron cursos de ${lenguaje} de nivel ${nivel}`);
    }
    res.json(resultado);
})

routerProgramacion.post('/', (req, res) => {
    let cursoNuevo = req.body;
    programacion.push(cursoNuevo);
    res.json(programacion);
});

routerProgramacion.put('/:id', (req, res) => {
    const cursoAztualizado = req.body;
    const id = req.params.id;
    const indice = programacion.findIndex(curso => curso.id == id);
    if(indice >= 0) return programacion[indice] = cursoAztualizado;
    res.json(programacion);
})

routerProgramacion.patch('/:id', (req, res) => {
    const infoAztualizado = req.body;
    const id = req.params.id;
    const indice = programacion.findIndex(curso => curso.id == id);
    if(indice >= 0) {
        const cursoModificar = programacion[indice];
        Object.assign(cursoModificar, infoAztualizado);
    }
    res.json(programacion);
})

routerProgramacion.delete('/:lenguaje', (req, res) => {
    const lenguaje = req.params.lenguaje;
    const indice = programacion.findIndex(curso => curso.lenguaje == lenguaje);
    if(indice >= 0) {programacion.splice(indice, 1);}
    console.log(indice);
    res.json(programacion);
})

routerProgramacion.delete('/:lenguaje/:id', (req, res) => {
    const lenguaje = req.params.lenguaje;
    const id = req.params.id;
    const indice = programacion.findIndex(curso => curso.lenguaje == lenguaje && curso.id == id);
    if(indice >= 0) {programacion.splice(indice,1);}
    res.json(programacion);
})

module.exports = routerProgramacion;