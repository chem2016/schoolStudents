const express = require('express');
const app = express();
const path = require('path');
const {Campus, Student} = require('./db/index')
const {syncAndSeed} = require('./db/seed')

const port = process.env.PORT || 3000;

app.get('/app.js', (req, res, next)=> res.sendFile(path.join(__dirname, 'dist', 'main.js')));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/style.css', (req, res, next)=> res.sendFile(path.join(__dirname, 'style.css')) )

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

app.delete('/api/campuses/:id', (req, res, next)=>{
    Campus.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(()=>res.sendStatus(204))
        .catch(next)
})

app.delete('/api/students/:id', (req, res, next)=>{
    Student.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(()=>res.sendStatus(204))
        .catch(next)
})

app.put('/api/campuses/:id', (req, res, next)=>{
    Campus.findByPk(req.params.id)
        .then(school=>school.update(req.body))
        .then(school=>res.send(school))
        .catch(next)
})

app.put('/api/students/:id', (req, res, next)=>{
    Student.findByPk(req.params.id)
        .then(student=>student.update(req.body))
        .then(student=>res.send(student))
        .catch(next)
})

app.use((req, res) => {
        res.send('404: The you are looking for does not exist!!!');
     });

app.use((error, req, res, next)=>{
    console.log('Errors from server: ', error);
    console.log('Errors from Object.keys: errors', Object.keys(error))
    let errors = [error];
    if(error.errors){
        errors = error.errors.map( error => error.message);
    }
    else if(error.original){
        errors = [error.original.message];
    }
    res.status(error.status || 500).send({errors})
})

// app.use(function(req, res) {
//     res.send('404: The you are looking for does not exist!!!');
//  });

app.listen(port, ()=> console.log(`listening on port ${port}`))
