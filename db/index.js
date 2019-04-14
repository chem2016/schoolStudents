const Sequelize = require('sequelize')

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
        defaultValue: "schoolsImageData['defaultImage']"
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
        defaultValue: "studentsImageData['defaultImage']"
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

module.exports = {
    Campus, 
    Student, 
    conn
}