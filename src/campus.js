import React from 'react'
import {connect} from 'react-redux'
import {deleteCampus} from './store'

const Campus = ({schools, history, onDelete}) => {
    return (
        <ul>
            {schools.map(school=>{
                return (
                <li key={school.id}>
                    {school.name}
                    <br/>
                    <img onClick={()=>history.push(`/campuses/${school.id}`)} src={school.imageUrl} style={{width:100,height:100}} className="img-responsive"/>
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

