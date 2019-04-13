const Sequelize = require('sequelize')
const schoolsImageData = {
    defaultImage: 'https://www.law.umn.edu/sites/law.umn.edu/files/styles/embed_large/public/ur_multimedia_403303.jpg?itok=-lRuKeUa',
    schoolAImage: 'https://www.law.umn.edu/sites/law.umn.edu/files/styles/embed_large/public/ur_multimedia_403303.jpg?itok=-lRuKeUa',
    schoolBImage: 'https://www.nyu.edu/content/dam/nyu/ugAdmissions/images/AbuDhabi/abuDhabi-pier.jpg/jcr:content/renditions/cq5dam.web.1280.1280.jpeg',
    schoolCImage: 'https://www.harvard.edu/sites/default/files/feature_item_media/091514_Features_SM_051.jpg',
    schoolDImage: 'https://www.usnews.com/img/college-photo_36391.jpg',
}
const studentsImageData = {
    defaultImage: 'https://media.gettyimages.com/photos/university-students-using-computer-for-their-research-in-a-cafe-picture-id516131882?s=612x612',
    studentAImage: 'https://www.assuredoccu.com/media/images/student.jpg',
    studentBImage: 'https://www.wes.org/wp-content/uploads/2018/08/blog_20180813_iStock-138017387.jpg',
    studentCImage: 'https://www.pride.com/sites/www.pride.com/files/2017/10/19/00.jpg',
    studentDImage: 'https://i.dailymail.co.uk/i/pix/2013/09/26/article-0-1845993200000578-671_634x539.jpg',
    studentEImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnjdbYF7V7AKsAXLudzk9AeIYYL9b3pZ_6sRD1x0wB74B8-6lW',
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
        defaultValue: studentsImageData['defaultImage']
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
    {name: 'UofM', imageUrl: schoolsImageData['schoolAImage'], address: 'Minneapolis, MN 55455', description: 'Best School in Mid-west'},
    {name: 'NYU', imageUrl: schoolsImageData['schoolBImage'], address: 'New York, NY 10003', description: 'Private School in NYC'},
    {name: 'Harvard', imageUrl: schoolsImageData['schoolCImage'], address: 'Cambridge, MA 02138', description: 'Best School in USA'},
    {name: 'Rutgers', imageUrl: schoolsImageData['schoolDImage'], address: 'New Brunswick, NJ', description: 'Public School in NJ'},
]
const students = [
    {firstName: 'John', lastName: 'Eric', email: 'John-Eric@gmail.com', imageUrl: studentsImageData['studentAImage'], gpa: 3.9},
    {firstName: 'Bob', lastName: 'Smith', email: 'Bob-Smith@gmail.com', imageUrl: studentsImageData['studentBImage'], gpa: 2.9},
    {firstName: 'Mike', lastName: 'Biby', email: 'Mike-Biby@gmail.com', imageUrl: studentsImageData['studentCImage'], gpa: 3.9},
    {firstName: 'Joe', lastName: 'Larry', email: 'Joe-Larry@gmail.com', imageUrl: studentsImageData['studentDImage'], gpa: 4.0},
    {firstName: 'Grant', lastName: 'Grants', email: 'Grant-Grants@gmail.com', imageUrl: studentsImageData['studentEImage'], gpa: 3.0}
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
        .then(([[school1, school2, school3, school4],[student1, student2, student3, student4, student5]])=>{
            return Promise.all([
                student1.setCampus(school1),
                student2.setCampus(school2),
                student3.setCampus(school2),
                student4.setCampus(school4),
                student5.setCampus(school4),
            ])
        })
}

module.exports = {
    Campus, 
    Student, 
    syncAndSeed
}