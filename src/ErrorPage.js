import React from 'react'

const ErrorPage = ({location: {pathname}}) => {
    console.log(pathname)
    return (
        <div>
            {`User request page ${pathname.slice(1)} does not exist!`}
        </div>
    )
}

export default ErrorPage