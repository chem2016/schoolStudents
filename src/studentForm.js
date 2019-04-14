import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addStudent, updateStudent} from './store'
import PropTypes from 'prop-types'

class StudentForm extends Component{
    constructor(props){
        super(props)
        this.state = this.stateFromStudent(this.props.student)
    }
    findStudentCampus = (student) =>{
        const campus = this.props.schools.find(school=>school.id === student.campusId)
        return campus
    }

    stateFromStudent = (student) => {
        return {
            firstName: student ? student.firstName : '',
            lastName: student ? student.lastName : '',
            email: student ? student.email : '',
            campus: student ? 
                student.campusId ? 
                    this.findStudentCampus(student).name
                    : ''
                : '',
            gpa: student ? student.gpa : '',
            imageUrl: student ? student.imageUrl : 'https://images.pexels.com/photos/1462631/pexels-photo-1462631.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            errors: []
        }
    }
    
    componentDidUpdate(prevProps){
        if(this.props.student && !prevProps.student){
            this.setState(this.stateFromStudent(this.props.student))
        }
    }

    onChange = (ev) => this.setState({[ev.target.name]: ev.target.value}, ()=>console.log(this.state))
    onSave = (ev) => {
        ev.preventDefault()
        const student = {...this.state}
        delete student.errors
        if(this.props.student){
            student.id = this.props.student.id
        }
        if(student.id){
            const schoolToUse = this.props.schools.find(school=>school.name === student.campus)
            student.campusId = schoolToUse ? schoolToUse.id : null
            this.props.onUpdate(student)
                .catch(ex=>this.setState({errors: ex.response.data.errors}))
        }else{
            this.props.onSave(student)
            .catch(ex=>this.setState({errors: ex.response.data.errors}))
        }
    }
    render(){
        const {onChange, onSave} = this
        const {firstName, lastName, email, campus, gpa, imageUrl, errors} = this.state
        const updating = this.props.student
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
                <input className='form-control' placeholder='gpa' name='gpa' value={gpa} onChange={onChange}/>
                <input className='form-control' placeholder='imageUrl' name='imageUrl' value={imageUrl} onChange={onChange}/>
                <select name='campus' className='form-control' value= {campus} onChange={onChange}>
                    <option value=''> --none--</option> 
                    {
                        this.props.schools.map(school=>{
                            return <option key={school.id} value={school.name}>{school.name}</option>
                        })
                    }
                </select>
                <div style={{ marginTop: '10px'}} className='btn-group'>
                <button className='btn btn-primary' type='submit'>{ updating ? 'Save' : 'Create' }</button>
                </div>
            </form>
        )
        
    }
}

const mapDispatchToProps = (dispatch, {history}) => {
    return {
        onSave: (student) => dispatch(addStudent(student, history)),
        onUpdate: (student) => dispatch(updateStudent(student, history))   
    }
}

const mapStateToProps = (state, {match}) => {
    let student;
    student = state.studentsReducer.find(s=>s.id === match.params.id*1)
    return {
        students: state.studentsReducer,
        schools: state.campusReducer,
        student
    }
}

StudentForm.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(StudentForm)