import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addCampus, updateCampus} from './store'

class CampusForm extends Component{
    constructor(props){
        super(props)
        this.state = this.stateFromSchool(this.props.school)
    }

    stateFromSchool = (school) => {
        return {
            name: school ? school.name : '',
            address: school ? school.address : '',
            imageUrl: school ? school.imageUrl : '',
            description: school ? school.description :'',
            errors: []
        }
    }
    componentDidUpdate(prevProps){
        if(this.props.school && !prevProps.school){
            this.setState(this.stateFromSchool(this.props.school))
        }
    }


    onChange=(ev)=>this.setState({[ev.target.name]: ev.target.value},()=>console.log(this.state))
    onSave=(ev)=>{
        ev.preventDefault();
        const school = {...this.state}
        delete school.errors
        console.log('in onSave: ', this.props)
        if(this.props.school){
            school.id = this.props.school.id;
        }
        if(school.id){
            this.props.onUpdate(school)
            .catch(ex=>{
                console.log('errors in onSave func campusForm: ', ex)
                this.setState({errors: ex.response.data.errors})
            })
        }else{
            this.props.onSave(school)
            .catch(ex=>{
                console.log('errors in onSave func campusForm: ', ex)
                this.setState({errors: ex.response.data.errors})
            })
        }
        
    }
    render(){
        const updating = this.props.school;
        const {name, address, imageUrl, description, errors} = this.state
        console.log('errors:', errors)
        const {onChange, onSave} = this
        return(
            <form onSubmit={onSave}>
                {
                    !!errors.length && (<ul className='alert alert-danger'>
                        {
                            errors.map((error, idx)=><li key={idx}>{error}</li>)
                        }
                    </ul>)
                }
                <input className='form-control' placeholder='name' name='name' value={name} onChange={onChange}/>
                <input className='form-control' placeholder='address' name='address' value={address} onChange={onChange}/>
                <input className='form-control' placeholder='imageUrl' name='imageUrl' value={imageUrl} onChange={onChange}/>
                <input className='form-control' placeholder='description' name='description' value={description} onChange={onChange}/>
                <div style={{ marginTop: '10px'}} className='btn-group'>
                <button className='btn btn-primary' type='submit'>{ updating ? 'Edit' : ' Create ' }</button>
                </div>
            </form>
        )
    }
}



const mapDispatchToProps = (dispatch, {history}) =>{
    return {
        onSave: (school)=>dispatch(addCampus(school, history)),
        onUpdate: (school)=>dispatch(updateCampus(school, history))
    }
}

const mapStateToProps = (state, {match}) => {
    console.log('state ', state)
    console.log('match ', match)
    let school;
    // this if is for a hard reload
    if(match.params.id){
        school = state.campusReducer.find(s=>s.id === match.params.id * 1)
    }
    return {
        schools: state.campusReducer,
        school
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CampusForm)