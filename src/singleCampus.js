import React from 'react';
import {connect} from 'react-redux';
import CampusForm from './campusForm'

const SingleCampus = ({match, schools, students, history}) => {
    const school = schools.find(s=>s.id === match.params.id*1)
    const matchStudents = students.filter(s=>s.campusId === school.id)
    console.log('in single campus: match', match)
    // if(match.params.id*1 === 6){
    //     return<p>school does not exist!!!</p>
    // }else{
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
            <div><CampusForm match={match} history={history}/></div>
        </div>
    )
}

const mapStateToProps = (state) =>{
    return {
        schools: state.campusReducer,
        students: state.studentsReducer    
    }
}

export default connect(mapStateToProps)(SingleCampus)