
import { createBrowserRouter , Outlet ,RouterProvider } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import Container from './components/Container/Container.jsx';
import Home from './pages/Home.jsx';
import Album from './pages/Album.jsx';
import Videos from './pages/Videos.jsx';
import NotFound from './pages/NotFound.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'


function App() {



  const Dashboard = () => {
    return  (
      <>
          <Header/>
           <Outlet />
          <Footer/>
      </>
    )
  }

  const router =  createBrowserRouter( [

    {
      path: "/",
      element: <Dashboard/>,
      children : [

        {
          path :"/",
          element : <Home/>
        } ,

        {
          path: "/album",
          element: <Album />,
        },
        {
          path: "/container/:title",
          element: <Container />,
        },
        {
          path: "/videos",
          element: <Videos />,
        },
        {
          path : "*",
          element : <NotFound />
        },
       
      ]
      ,
      
    },
  
  ],
  { basename: '/reactApp' } // Specify the base path here
    
  )

  
  return (
      <div  className='App' >
         <RouterProvider router={router} />
    </div>

  )
}

export default App
