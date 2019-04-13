import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addStudent} from './store'

class studentForm extends Component{
    constructor(){
        super()
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            campusId: '',
            gpa: '',
            errors: []
        }
    }
    onChange = (ev) => this.setState({[ev.target.name]: ev.target.value})
    onSave = (ev) => {
        ev.preventDefault()
        const student = {...this.state}
        delete student.errors
        this.props.onSave(student)
            .catch(ex=>this.setState({errors: ex.response.data.errors}))
    }
    render(){
        const {onChange, onSave} = this
        const {firstName, lastName, email, campusId, gpa, errors} = this.state
        return(
            <form onSubmit={onSave}>
                {
                    !!errors.length && (<ul className='alert alert-danger'>
                        {errors.map((error, idx)=><li key={idx}>{error}</li>)}
                    </ul>)
                }
                <input className='form-control' placeholder='firstName' name='firstName' value={firstName} onChange={onChange}/>
                <input className='form-control' placeholder='lastName' name='lastName' value={lastName} onChange={onChange}/>
                <input className='form-control' placeholder='email' name='email' value={email} onChange={onChange}/>
                <input className='form-control' placeholder='campusId' name='campusId' value={campusId} onChange={onChange}/>
                <input className='form-control' placeholder='gpa' name='gpa' value={gpa} onChange={onChange}/>
                <div style={{ marginTop: '10px'}} className='btn-group'>
                <button className='btn btn-primary' type='submit'>{ 'Create' }</button>
                </div>
            </form>
        )
        
    }
}

const mapDispatchToProps = (dispatch, {history}) => {
    return {
        onSave: (student) => dispatch(addStudent(student, history))  
    }
}

export default connect(null, mapDispatchToProps)(studentForm)