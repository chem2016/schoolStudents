import React from 'react'
import {connect} from 'react-redux'
import {deleteStudent} from './store'
import PropTypes from 'prop-types'

const Students = ({students, schools, history, onDelete}) => {
    // massage data after delete or update
    const schoolsToShow = schools.filter(s=>s.id)
    const studentsToShow = students.map(student=>{
        let schoolId = student.campusId
        if(schoolsToShow.find(s=>s.id === schoolId)){
            return student
        }else{
            student.campusId = null
            return student
        }
    })
    return (
        <ul className='list-group'>
            {studentsToShow.map(student=>{
                return (
                    <li key={student.id}  className='list-group-item'>
                        <span onClick={()=>history.push(`/students/${student.id}`)}>{`${student.firstName} ${student.lastName}`}</span>
                        <button onClick={()=>onDelete(student.id)}>X</button>
                        <br/>
                        <span>{`Email: ${student.email}`}</span>
                        <br/>
                        <span>{`GPA: ${student.gpa}`}</span>
                        <br/>
                        <img src={student.imageUrl} style={{width:100,height:100}} className="img-responsive"/>
                        <p>{`From Campus ${student.campusId}`}</p>
                        
                    </li>)
            })}
        </ul>
    )
}

const mapStateToProps = (state)=> {
    return {
      students: state.studentsReducer, 
      schools: state.campusReducer
    };
  };

const mapDispatchToProps = (dispatch) => {
    return {
        onDelete: (id)=>dispatch(deleteStudent(id))
    }
}

Students.propTypes = {
    students: PropTypes.arrayOf(PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        email: PropTypes.string,
        gpa: PropTypes.string,
        imageUrl: PropTypes.string,
        // campusId: PropTypes.number,
    })),
}

export default connect(mapStateToProps, mapDispatchToProps)(Students)