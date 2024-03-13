// Obligatorio importar express
const express = require ('express');
// Crear una variable que permita usar las funciones de express
const app = express();

const { infoCursos } = require('./datos/cursos');

app.use(express.json());

// Routers
const routerProgramacion = require('./routers/router_Programacion.js');
app.use('/api/cursos/programacion',routerProgramacion);

const routerMatematicas = require('./routers/router_Matematicas.js');
app.use('/api/cursos/matematicas',routerMatematicas);

// Routing
// Crear rutas
app.get('/',(req, res) => {
    res.send('Mi primer curso de Node.js');
});

app.get('/api/cursos',(req, res) => {
    res.json(infoCursos);
});


const puerto = process.env.PORT || 3000 ;

app.listen(puerto,()=>{
    console.log(`El puerto se encuentra en el puerto ${puerto}`);
    console.log(`La url es http://localhost:${puerto}`);
})