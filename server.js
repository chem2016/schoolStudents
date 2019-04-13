const express = require('express');
const app = express();
const path = require('path');
const {Campus, Student, syncAndSeed} = require('./db')

const port = process.env.PORT || 3000;

app.get('/app.js', (req, res, next)=> res.sendFile(path.join(__dirname, 'dist', 'main.js')));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

syncAndSeed()
    .then(()=>console.log('sync data for schools and students'))

app.use(express.json());
app.get('/api/campuses', (req, res, next)=>{
    Campus.findAll({
        order: [['name']]
    })
    .then(campus=>res.send(campus))
    .catch(next)
})

app.get('/api/students', (req, res, next)=>{
    Student.findAll({
        order: [['lastName']]
    })
    .then(students=>res.send(students))
    .catch(next)
})
// how to not use include?? HY
app.get('/api/campuses/:id', (req, res, next)=>{
    Campus.findOne({
        id: req.params.id,
        include: [
            {
                model: Student,
            }
        ],
    })
    .then(shcool=>res.send(shcool))
    .catch(next)
})

app.get('/api/students/:id', (req, res, next)=>{
    Student.findOne({
        id: req.params.id,
        include: [
            {
                model: Campus
            }
        ]
    })
    .then(student=>res.send(student))
    .catch(next)
})

app.post('/api/campuses', (req, res, next)=>{
    Campus.create(req.body)
        .then(campus=>res.send(campus))
        .catch(next)
})

app.post('/api/students', (req, res, next)=>{
    Student.create(req.body)
        .then(student=>res.send(student))
        .catch(next)
})

app.use((error, req, res, next)=>{
    console.log(error);
    console.log(Object.keys(error))
    let errors = [error];
    if(error.errors){
        errors = error.errors.map( error => error.message);
    }
    else if(error.original){
        errors = [error.original.message];
    }
    res.status(error.status || 500).send({errors})
})


app.listen(port, ()=> console.log(`listening on port ${port}`))
