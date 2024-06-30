import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Table = () => {


    const [users, setUsers] = useState([])

    let getAll = async () => {
        let res = await axios('http://localhost:3200/api/users/all')
        // console.log(res.data)
        setUsers(res.data)
    }

    useEffect(() => {
        getAll()
    }, [users])



    return (
        <>

            <section className="relative py-16 bg-blueGray-50">
                <div className="w-full mb-12 px-4">
                    <div
                        className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded 
        bg-pink-900 text-white"
                    >
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1 ">
                                    <h3 className="font-semibold text-lg text-white">Card Tables</h3>
                                </div>
                            </div>
                        </div>
                        <div className="block w-full overflow-x-auto ">
                            <table className="items-center w-full bg-transparent border-collapse">
                                <thead>
                                    <tr>
                                        <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">
                                            Username
                                        </th>
                                        <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">
                                            email
                                        </th>
                                        <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">
                                            Full Name
                                        </th>
                                        <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">
                                            Bio
                                        </th>
                                        <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">
                                            link
                                        </th>
                                        <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700" />
                                    </tr>
                                </thead>
                                <tbody>
                                    {users && users.map(user => {
                                        return (
                                            <tr>
                                                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                                                    <img
                                                        src={user?.profileImg || 'https://i.pinimg.com/originals/90/d1/ac/90d1ac48711f63c6a290238c8382632f.jpg'}
                                                        className="h-12 w-12 bg-white rounded-full border"
                                                        alt="..."
                                                    />
                                                    <span className="ml-3 font-bold text-white">
                                                        {" "}
                                                        Argon Design System{" "}
                                                    </span>
                                                </th>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {user?.email}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    <i className="fas fa-circle text-orange-500 mr-2" />
                                                    {user?.fullName}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    <div className="flex">
                                                        {user?.bio}
                                                    </div>
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {user?.link}
                                                </td>
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                                                    <a
                                                        href="#pablo"
                                                        className="text-blueGray-500 block py-1 px-3"

                                                    >
                                                        <i className="fas fa-ellipsis-v" />
                                                    </a>
                                                    <div
                                                        className="hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
                                                        id="table-dark-1-dropdown"
                                                    >
                                                        <a
                                                            href="#pablo"
                                                            className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                                                        >
                                                            Action
                                                        </a>
                                                        <a
                                                            href="#pablo"
                                                            className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                                                        >
                                                            Another action
                                                        </a>
                                                        <a
                                                            href="#pablo"
                                                            className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                                                        >
                                                            Something else here
                                                        </a>
                                                        <div className="h-0 my-2 border border-solid border-blueGray-100" />
                                                        <a
                                                            href="#pablo"
                                                            className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                                                        >
                                                            Seprated link
                                                        </a>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}

export default Table