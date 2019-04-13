import React from 'react';
import {connect} from 'react-redux';

const singleCampus = ({match, schools, students, history}) => {
    const school = schools.find(s=>s.id === match.params.id*1)
    const matchStudents = students.filter(s=>s.campusId === school.id)
    return (
        <div>
            {school ? 
                <div>
                    {school.name}
                    <br/>
                    <img src={school.imageUrl} style={{width:100,height:100}} className="img-responsive"/>
                    <br/>
                    <p>{school.address}</p>
                    <p>{school.description}</p>
                </div>
                : null}
            {matchStudents.length ?
                <div>
                    <ul>
                        {matchStudents.map(student=>{
                            return(
                                <li key={student.id} onClick={()=>history.push(`/students/${student.id}`)}>
                                    {`${student.firstName} ${student.lastName}`}
                                </li>
                            )
                        })}
                    </ul>
                </div>
                : <p>This school currently has no students</p>
            }
        </div>
    )
}

const mapStateToProps = (state) =>{
    return {
        schools: state.campusReducer,
        students: state.studentsReducer    
    }
}

export default connect(mapStateToProps)(singleCampus)