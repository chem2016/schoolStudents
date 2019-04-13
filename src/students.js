import React from 'react'
import {connect} from 'react-redux'
import {deleteStudent} from './store'

const Students = ({students, history, onDelete}) => {
    return (
        <ul className='list-group'>
            {students.map(student=>{
                return (
                    <li key={student.id}  className='list-group-item'>
                        <span onClick={()=>history.push(`/students/${student.id}`)}>{`${student.firstName} ${student.lastName}`}</span>
                        <button onClick={()=>onDelete(student.id)}>X</button>
                    </li>)
            })}
        </ul>
    )
}

const mapStateToProps = (state)=> {
    return {
      students: state.studentsReducer
    };
  };

const mapDispatchToProps = (dispatch) => {
    return {
        onDelete: (id)=>dispatch(deleteStudent(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Students)