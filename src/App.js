import React, {Component, Fragment} from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import Nav from './nav'
import Campus from './campus'
import Students from './students'
import SingleCampus from './singleCampus'
import singleStudent from './singleStudent'
import CampusForm from './campusForm'
import StudentForm from './studentForm'
import {fetchSchools, fetchStudents} from './store'

class App extends Component{
    
    componentDidMount(){
        this.props.fetchData()
    }

    render(){
        return (
            <Router>
                <Fragment>
                    <h1>Acme Campus and Students</h1>
                    <Route path='/' component={Nav}/>
                    <Route path='/campuses' exact component={Campus}/>
                    <Route path='/students' exact component={Students}/>
                    <Route path='/campuses/:id' render={({match, history})=>(<SingleCampus match={match} history={history}/>)}/>
                    <Route path='/students/:id' component={singleStudent}/>
                    <Route path='/addCampuses' exact component={CampusForm}/>
                    <Route path='/addStudents' exact component={StudentForm}/>
                </Fragment>
            </Router>
        )
    }
}

const mapDispatchToProps = (dispatch) => (
    {
        fetchData: () => {
            dispatch(fetchSchools())
            dispatch(fetchStudents())
        }
    }
)

export default connect(null, mapDispatchToProps)(App)