import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addCampus} from './store'

class campusForm extends Component{
    constructor(){
        super()
        this.state = {
            name: '',
            address: '',
            imageUrl: '',
            description: '',
        }
    }

    onChange=(ev)=>this.setState({[ev.target.name]: ev.target.value},()=>console.log(this.state))
    onSave=(ev)=>{
        ev.preventDefault();
        const school = {...this.state}
        this.props.onSave(school)
    }
    render(){
        const {name, address, imageUrl, description} = this.state
        const {onChange, onSave} = this
        return(
            <form onSubmit={onSave}>
                <input className='form-control' placeholder='name' name='name' value={name} onChange={onChange}/>
                <input className='form-control' placeholder='address' name='address' value={address} onChange={onChange}/>
                <input className='form-control' placeholder='imageUrl' name='imageUrl' value={imageUrl} onChange={onChange}/>
                <input className='form-control' placeholder='description' name='description' value={description} onChange={onChange}/>
                <div style={{ marginTop: '10px'}} className='btn-group'>
                <button className='btn btn-primary' type='submit'>{ 'Create' }</button>
                </div>
            </form>
        )
    }
}

const mapDispatchToProps = (dispatch, {history}) =>{
    return {
        onSave: (school)=>dispatch(addCampus(school, history))
    }
}

export default connect(null,mapDispatchToProps)(campusForm)