
import { createBrowserRouter , Outlet ,RouterProvider } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import Container from './components/Container/Container.jsx';
import Home from './pages/Home.jsx';
import Album from './pages/Album.jsx';
import Docs from './pages/Docs.jsx';
import NotFound from './pages/NotFound.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Template from './pages/Template.jsx';


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
          path: "/docs",
          element: <Docs />,
        },
        {
          path : "*",
          element : <NotFound />
        },
       
      ]
      ,
      
    },

    {
      path :"/home",
      element : <Template/>
    } ,
  
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
