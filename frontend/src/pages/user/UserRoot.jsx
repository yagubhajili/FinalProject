import React from 'react'
import { Outlet } from 'react-router-dom'
import Navigation from '../../layout/navigation/Navigation'

const UserRoot = () => {
    return (
        <>
            <Outlet />
            <Navigation />
        </>

    )
}

export default UserRoot