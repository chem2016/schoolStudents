import React from 'react'
import {connect} from 'react-redux'
import {deleteCampus} from './store'
import PropTypes from 'prop-types'

const Campus = ({schools, history, onDelete}) => {
    return (
        <ul className='list-group'>
            {schools.map(school=>{
                return (
                <li key={school.id} className='list-group-item'>
                    {/* <br/> */}
                    <img className='school-image img-responsive' onClick={()=>history.push(`/campuses/${school.id}`)} src={school.imageUrl} />
                    {school.name}
                    <button onClick={()=>onDelete(school.id)}>X</button>
                </li>)
            })}
        </ul>
    )
}

const mapStateToProps = (state)=> {
    return {
      schools: state.campusReducer,   // questions HY ??
      students: state.studentsReducer
    };
  };
const mapDispatchToProps = (dispatch) => {
    return {
        onDelete: (id)=>{
            return dispatch(deleteCampus(id))
        }
    }
}
// it check the types when you pass if from props, here it is checking in the mapStateToProps function
Campus.propTypes = {
    schools: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        address: PropTypes.string,
        imageUrl: PropTypes.string,
        description: PropTypes.string
    })),
}

export default connect(mapStateToProps, mapDispatchToProps)(Campus)

