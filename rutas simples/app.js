// Obligatorio importar express
const express = require ('express');
// Crear una variable que permita usar las funciones de express
const app = express();

const { infoCursos } = require('../src/datos/cursos');


// Routing

// Crear rutas
app.get('/',(req, res) => {
    res.send('Mi primer curso de Node.js');
});

app.get('/api/cursos',(req, res) => {
    res.send(JSON.stringify(infoCursos));
});
app.get('/api/cursos/programacion',(req, res) => {
    res.send(JSON.stringify(infoCursos.programacion))
});
app.get('/api/cursos/matematicas',(req, res) => {
    res.send(JSON.stringify(infoCursos.matematicas))
});

// Parametros de busqueda
// Crear una ruta que obtiene usa el valor de lenguaje para buscar en el json
app.get('/api/cursos/programacion/:lenguaje',(req, res) => {
    const lenguaje = req.params.lenguaje;
    const resultado = infoCursos.programacion.filter(curso => curso.lenguaje === lenguaje);
    if(resultado.length === 0){
        return res.status(404).send(`No se encontraron cursos de ${lenguaje}`)
    }
    res.send(JSON.stringify(resultado))
});

// Crear una ruta que obtiene usa el valor de tema para buscar en el json
app.get('/api/cursos/matematicas/:tema',(req,res) => {
    const tema = req.params.tema;
    const resultado = infoCursos.matematicas.filter(cursos => cursos.tema === tema);
    if(resultado.length === 0){
        return res.status(404).send(`No se encontro el curso de ${tema}`);
    }
    res.send(JSON.stringify(resultado))
})

app.get('/api/cursos/programacion/:lenguaje/:nivel',(req,res) => {
    const lenguaje = req.params.lenguaje;
    const nivel = req.params.nivel
    const resultado = infoCursos.programacion.filter(cursos => cursos.lenguaje === lenguaje && cursos.nivel === nivel)
    if(resultado.length === 0){
        return res.status(404).send(`No se encontraron cursos de ${lenguaje} de nivel ${nivel}`)
    }
    res.send(JSON.stringify(resultado))
})

const puerto = process.env.PORT || 3000 

app.listen(puerto,()=>{
    console.log(`El puerto se encuentra en el puerto ${puerto}`)
    console.log(`La url es http://localhost:${puerto}`)
})