import './App.css'
import Home from './pages/homePage/Home';
import Main from './pages/MainPage/Main';
import Library from './pages/libraryPage/Library';
import Profile from './pages/profilePage/Profile';
import Createpost from './pages/createPostPage/Createpost';
import { Authenticate } from './components/Authenticated/Authenticate';
import Login from './pages/LoginPage/Login';
import Signup from './pages/SignupPage/Signup';
import AuthLayout from './components/authlayout/AuthLayout';
import Layout from './Layout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomeLayout from './pages/homePage/HomeLayout';
import AuthInitializer from './features/auth/AuthInitializer';

const route = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        path: '',
        element: <Home/>
      }
    ]
  },

  {
    element: <Authenticate><Layout /></Authenticate>,
    children: [
      {
        path: "home",
        element: <Main />
      },
      {
        path: "profile",
        element: <Profile />
      },
      {
        path: "library",
        element: <Library />
      },
      {
        path: "post",
        element: <Createpost />
      }
    ]
  },
  {
    path: 'auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'signup',
        element: <Signup />
      }
    ]
  }
])


function App() {

  return (
    <>
      <AuthInitializer/>
      <RouterProvider router={route} />
    </>
  )
}

export default App
