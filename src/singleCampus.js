import React from 'react';
import {connect} from 'react-redux';
import CampusForm from './campusForm'
import PropTypes from 'prop-types'

const SingleCampus = ({match, schools, students, history}) => {
    const school = schools.find(s=>s.id === match.params.id*1)
    const matchStudents = school ? students.filter(s=>s.campusId === school.id) : []
    return (
        <div>
            {school ? 
                <div className='single-school'>
                    <span className='school-name'>{school.name}</span>
                    <br/>
                    <img src={school.imageUrl} style={{width:100,height:100}} className="img-responsive"/>
                    <br/>
                    <p>{school.address}</p>
                    <p>{school.description}</p>
                </div>
                : <p>This school does not exist!</p>}
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
                : <p>This school currently has no students!</p>
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

SingleCampus.propTypes = {
    schools: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        address: PropTypes.string,
        imageUrl: PropTypes.string,
        description: PropTypes.string,
    })),
    students: PropTypes.arrayOf(PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        gpa: PropTypes.string,
        email: PropTypes.string,
        imageUrl:PropTypes.string
    }))
}

export default connect(mapStateToProps)(SingleCampus)