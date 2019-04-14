import React from 'react'
import {connect} from 'react-redux'
import {deleteCampus} from './store'

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
      schools: state.campusReducer   // questions HY ??
    };
  };
const mapDispatchToProps = (dispatch) => {
    return {
        onDelete: (id)=>dispatch(deleteCampus(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Campus)

