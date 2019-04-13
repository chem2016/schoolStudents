const Sequelize = require('sequelize')
const schoolsImageData = {
    defaultImage: 'https://www.law.umn.edu/sites/law.umn.edu/files/styles/embed_large/public/ur_multimedia_403303.jpg?itok=-lRuKeUa',
    schoolAImage: 'image1',
    schoolBImage: 'image2',
    schoolCImage: 'image3',
    schoolDImage: 'image4',
}

const conn = new Sequelize(process.env.DATABASE_URL)
const Campus = conn.define('campus',{
    name: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true,
        },
        allowNull:false
    },
    imageUrl: {
        type: Sequelize.STRING,
        defaultValue: schoolsImageData['defaultImage']
    },
    address: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true,
        },
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT
    }
})
const Student = conn.define('student',{
    firstName: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true,
        },
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true,
        },
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true,
            isEmail : true
        },
        allowNull: false
    },
    imageUrl: {
        type: Sequelize.STRING,
        defaultValue: 'https://media.gettyimages.com/photos/university-students-using-computer-for-their-research-in-a-cafe-picture-id516131882?s=612x612'
    },
    gpa: {
        type: Sequelize.DECIMAL,
        validate: {
            min: 0.0,
            max: 4.0
        }
    }
})

Campus.hasMany(Student)
Student.belongsTo(Campus)
const schools = [
    {name: 'UofM', imageUrl: 'image1', address: 'Minneapolis, MN 55455', description: 'Best School in Mid-west'},
    {name: 'NYU', imageUrl: 'image2', address: 'New York, NY 10003', description: 'Private School in NYC'},
    {name: 'Harvard', imageUrl: 'image3', address: 'Cambridge, MA 02138', description: 'Best School in USA'},
    {name: 'Rutgers', imageUrl: 'image4', address: 'New Brunswick, NJ', description: 'Public School in NJ'},
]
const students = [
    {firstName: 'John', lastName: 'Eric', email: 'John-Eric@gmail.com', imageUrl: 'image1', gpa: 3.9},
    {firstName: 'Bob', lastName: 'Smith', email: 'Bob-Smith@gmail.com', imageUrl: 'image2', gpa: 2.9},
    {firstName: 'Mike', lastName: 'Biby', email: 'Mike-Biby@gmail.com', imageUrl: 'image3', gpa: 3.9},
    {firstName: 'Joe', lastName: 'Larry', email: 'Joe-Larry@gmail.com', imageUrl: 'image4', gpa: 4.0},
    {firstName: 'Grant', lastName: 'Grants', email: 'Grant-Grants@gmail.com', imageUrl: 'image5', gpa: 3.0}
]

const syncAndSeed = () => {
    return conn.sync({force: true})
        .then(()=>{
            return Promise.all([
                Promise.all(
                    schools.map(school=>Campus.create(school))
                ),
                Promise.all(
                    students.map(student=>Student.create(student))
                )
            ])
        })
        // .then(([[school1, school2, school3, school4],[student1, student2, student3, student4, students]])=>{
        //     return Promise.all([
        //         student1.setCampus(school1),
        //         student2.setCampus(school1),
        //         student3.setCampus(school1),
        //         student4.setCampus(school1),
        //         student5.setCampus(school1),
        //     ])
        // })
}

module.exports = {
    Campus, 
    Student, 
    syncAndSeed
}