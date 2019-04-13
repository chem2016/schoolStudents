import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const Nav = ({location: {pathname}}) => {
    const links = [
        {
            to: '/', label: 'Home'
        },
        {
            to: '/campuses', label: 'Campus'
        },
        {
            to: '/students', label: 'Students'
        },
    ]

    return (
        <ul className='nav nav-pills' style={{ marginBottom: '20px'}}>
            {
            links.map( link => (
                <li key={ link.to } className={`nav-item${ pathname === link.to ? ' active': ''}`}>
                <Link to={ link.to }  className={`nav-link${ pathname === link.to ? ' active': ''}`}>{ link.label }</Link>
                </li>
            ))
            }
        </ul>
    )
}

export default Nav