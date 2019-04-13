import React from 'react'
import {connect} from 'react-redux'

const Campus = ({schools, history}) => {
    return (
        <ul>
            {schools.map(school=>{
                return (
                <li key={school.id}>
                    {school.name}
                    <br/>
                    <img onClick={()=>history.push(`/campuses/${school.id}`)} src={school.imageUrl} style={{width:100,height:100}} className="img-responsive"/>
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

export default connect(mapStateToProps)(Campus)

