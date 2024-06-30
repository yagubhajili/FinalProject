import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Table = () => {
    const [users, setUsers] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([])
    const [search, setSearch] = useState('')
    const [sortOrder, setSortOrder] = useState('none')  // Added sortOrder state

    // Fetch all users
    let getAll = async () => {
        try {
            let res = await axios('http://localhost:3200/api/users/all')
            setUsers(res.data)
            setFilteredUsers(res.data)  // Initialize filtered users
        } catch (error) {
            console.error('Error fetching users:', error)
        }
    }


    useEffect(() => {
        getAll()
    }, [])


    useEffect(() => {
        let results = users.filter(user =>
            user.username.toLowerCase().includes(search.toLowerCase())
        )

        if (sortOrder === 'asc') {
            results.sort((a, b) => a.username.localeCompare(b.username))
        } else if (sortOrder === 'desc') {
            results.sort((a, b) => b.username.localeCompare(a.username))
        }

        setFilteredUsers(results)
    }, [search, sortOrder, users])


    const handleSortAsc = () => {
        setSortOrder('asc')
    }

    const handleSortDesc = () => {
        setSortOrder('desc')
    }

    return (
        <div className='relative py-16 bg-gradient-to-r from-blue-500 via-purple-500 to-red-500'>
   
            <form className="mt-0 max-w-md mx-auto">
                <label
                    htmlFor="default-search"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                    Search
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </div>
                    <input
                        onChange={(e) => setSearch(e.target.value)}
                        type="search"
                        id="default-search"
                        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search by Username..."
                        value={search}
                        required=""
                    />
                </div>
            </form>

            <div className="mt-4 flex justify-center gap-4">
                <button
                    onClick={handleSortAsc}
                    className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300"
                >
                    Sort A-Z
                </button>
                <button
                    onClick={handleSortDesc}
                    className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300"
                >
                    Sort Z-A
                </button>
            </div>

            <section className="relative py-16 bg-blueGray-50">
                <div className="w-full mb-12 px-4">
                    <div
                        className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded 
        bg-pink-900 text-white"
                    >
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1 ">
                                    <h3 className="font-semibold text-lg text-white">User Table</h3>
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
                                            Email
                                        </th>
                                        <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">
                                            Full Name
                                        </th>
                                        <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">
                                            Bio
                                        </th>
                                        <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-pink-800 text-pink-300 border-pink-700">
                                            Link
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers && filteredUsers.map(user => (
                                        <tr key={user?._id}>
                                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                                                <img
                                                    src={user?.profileImg || 'https://i.pinimg.com/originals/90/d1/ac/90d1ac48711f63c6a290238c8382632f.jpg'}
                                                    className="h-12 w-12 bg-white rounded-full border"
                                                    alt="Profile"
                                                />
                                                <span className="ml-3 font-bold text-white">
                                                    {user?.username || 'Unknown User'}
                                                </span>
                                            </th>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                {user?.email}
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                {user?.fullName}
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                {user?.bio}
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                {user?.link}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Table
