import React from 'react'
import { Link } from 'react-router-dom'
import './navigation.scss'
import MessageIcon from '../../components/icons/MessageIcon'
import HomeIcon from '../../components/icons/HomeIcon'
import TiktokLogo from '../../components/icons/TiktokLogo'

const Navigation = () => {
    return (
        <>
            <section id='topBar'>
                <div>
                    <TiktokLogo />
                </div>
                <div>
                    <input type="search" />

                </div>
                <div>

                </div>
                <div>
                    <MessageIcon />
                    <HomeIcon />
                </div>
            </section>
            <nav>
                <ul>
                    <li>
                        <Link to='/home'>
                            For You
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
            </nav>


        </>
    )
}

export default Navigation