import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = () => {
    return (
        <>
            <ul>
                <li>
                    <Link to='/home'>
                        Home
                    </Link>
                </li>
                <li>
                    <Link to='/discover'>
                        Discover
                    </Link>
                </li>
                <li>
                    <Link to='/inbox'>
                        Inbox
                    </Link>
                </li>
                <li>
                    <Link to='/profile'>
                        Profile
                    </Link>
                </li>
                <li>
                    <Link to='/upload'>
                        Uplaod
                    </Link>
                </li>
            </ul>

        </>
    )
}

export default Navigation