import React from 'react'
import {connect} from 'react-redux'

const Students = ({students, history}) => {
    return (
        <ul className='list-group'>
            {students.map(student=>{
                return (
                    <li key={student.id} onClick={()=>history.push(`/students/${student.id}`)} className='list-group-item'>
                        {`${student.firstName} ${student.lastName}`}
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

export default connect(mapStateToProps)(Students)