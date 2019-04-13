import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios'

// action
const SET_CAMPUS = 'SET_CAMPUS'
const SET_STUDENTS = 'SET_STUDENTS'

// action creator
const setCampus = (schools) => (
    {
        type: SET_CAMPUS,
        schools,
    }
)
const setStudents = (students) => (
    {
        type: SET_STUDENTS,
        students,
    }
)

// reducer
const campusReducer = (state=[], action) => {
    switch(action.type){
        case SET_CAMPUS:
            return action.schools
        default:
            return state
    }
}
const studentsReducer = (state=[], action) => {
    switch(action.type){
        case SET_STUDENTS:
            return action.students
        default:
            return state
    }
}

const reducer = combineReducers({
    campusReducer,
    studentsReducer
})
// fetch methods
export const fetchSchools = () => {
    return (dispatch) => {
        return axios.get('/api/campuses')
            .then(resp=>resp.data)
            .then(schools=>{
                dispatch(setCampus(schools))
            })
    }
}
export const fetchStudents = () => {
    return (dispatch) => {
        return axios.get('/api/students')
            .then(resp=>resp.data)
            .then(students=>{
                dispatch(setStudents(students))
            })
    }
}

export const addCampus = (school, history) => {
    return (dispatch)=>{
        return axios.post('/api/campuses', school)
            .then(()=>dispatch(fetchSchools()))
            .then(()=>history.push('/campuses'))
    }
}

export const addStudent = (student, history) => {
    return (dispatch)=>{
        return axios.post('/api/students', student)
            .then(()=>dispatch(fetchStudents()))
            .then(()=>history.push('/students'))
    }
}


const store = createStore(reducer,applyMiddleware(thunk))
export default store;