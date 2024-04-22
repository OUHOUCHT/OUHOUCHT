
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
import ReactGA from 'react-ga4';
import { useEffect } from 'react';
import TermsOfService from './components/TermsOfService.jsx';
import PrivacyPolicy from './components/PrivacyPolicy.jsx';
import Photos from './pages/Photos.jsx';
import Book from './pages/Feedback/Feedback.jsx';
import Feedback from './pages/Feedback/Feedback.jsx';
import OpinionComponent from './pages/OpinionComponent/OpinionComponent.jsx';


function App() {
  

  const TRACKING_ID = "G-3M74RCYBPY"; // your Measurement ID


  useEffect(() => {
    ReactGA.initialize(TRACKING_ID);
    // Send pageview with a custom path
    ReactGA.send({ hitType: 'pageview', page: window.location.pathname ,title : "إصدارات البرلمان"});
}, [])



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
          path: "/photos",
          element: <Photos />,
        },
        {
          path: "/feedBack",
          element: <Feedback />,
        },
        {
          path: "/privacyPolicy",
          element: <PrivacyPolicy />,
        },
        {
          path: "/termsOfService",
          element: <TermsOfService />,
        },

        {
          path : "/Opinion",
          element : <OpinionComponent />
        },
        {
          path : "*",
          element : <NotFound />
        },
        
      ]
      ,
      
    },
/*
   {
      path :"/home",
      element : <Template/>
    } 
    */
  
  ],
  { basename: '/parlement' } // Specify the base path here
    
  )

  
  return (
      <div  className='App' >
         <RouterProvider router={router} />
    </div>

  )
}

export default App
