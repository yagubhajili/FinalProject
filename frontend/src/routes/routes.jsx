import Discover from "../pages/discover/Discover";
import Home from "../pages/home/Home";
import Inbox from "../pages/inbox/Inbox";
import Login from "../pages/login/Login";
import Profile from "../pages/profile/Profile";
import Upload from "../pages/upload/Upload";
import UserRoot from "../pages/user/UserRoot";

export const routes = [
    {
        path: "/",
        element: <UserRoot />,
        children: [
            {
                path: "/home",
                element: <Home />,
            },
            {
                path: "/discover",
                element: <Discover />,
            },
            {
                path: "/inbox",
                element: <Inbox />,
            },
            {
                path: "/profile",
                element: <Profile />,
            },
            {
                path: "/upload",
                element: <Upload />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Upload />,
            },
        ]
    },

]