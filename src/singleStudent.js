import React from 'react'
import {connect} from 'react-redux'

const singleStudent = ({match, students, schools, history}) => {
    const student = students.find(s=>s.id === match.params.id*1)
    const currentSchool = student ? schools.find(school=>school.id === student.campusId): null
    return (
        <div>
            {student? 
                <div>
                    {`${student.firstName} ${student.lastName}`}
                    <br/>
                    {student.email}
                    <br/>
                    <img src={student.imageUrl} style={{width:100,height:100}} className="img-responsive"/>
                    <br/>
                    {student.gpa}
                </div>
                : null
            }
            {currentSchool?
                <div onClick={()=>history.push(`/campuses/${currentSchool.id}`)}>
                    {`This student is at campus: ${currentSchool.name}`}
                </div>
                : <p>This student has not enrolled in any school yet</p>
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        students: state.studentsReducer,
        schools: state.campusReducer,
    }
}


export default connect(mapStateToProps)(singleStudent)