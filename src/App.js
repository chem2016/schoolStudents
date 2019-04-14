import React, {Component, Fragment} from 'react'
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import Nav from './nav'
import Campus from './campus'
import Students from './students'
import SingleCampus from './singleCampus'
import singleStudent from './singleStudent'
import CampusForm from './campusForm'
import StudentForm from './studentForm'
import ErrorPage from './ErrorPage'
import {fetchSchools, fetchStudents} from './store'

class App extends Component{
    
    constructor(){
        super()
        this.state = { isLoading: true }
    }

    componentDidMount(){
        this.props.fetchData()
        this.setState({isLoading: false})
    }

    render(){
        return (
            <Router>
                {this.state.loading ? 
                    <div class="preload-title">
                        Hold on, it's loading!
                    </div>
                    : 
                    <Fragment>
                        <h1>Acme Campus and Students</h1>
                        <Route path='/' component={Nav}/>
                        <Switch>
                            <Route path='/campuses' exact component={Campus}/>
                            <Route path='/students' exact component={Students}/>
                            <Route path='/campuses/:id' render={({match, history})=>(<SingleCampus match={match} history={history}/>)}/>
                            <Route path='/students/:id' component={singleStudent}/>
                            <Route path='/addCampuses' exact component={CampusForm}/>
                            <Route path='/addStudents' exact component={StudentForm}/>
                            <Route component={ErrorPage}/>
                        </Switch>
                    </Fragment>
                } 
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