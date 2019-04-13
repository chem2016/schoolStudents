import React from 'react'
import {connect} from 'react-redux'

const Students = ({students, history}) => {
    return (
        <ul>
            {students.map(student=>{
                return (
                    <li key={student.id} onClick={()=>history.push(`/students/${student.id}`)}>
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