import { useEffect, useState } from "react";
import TitleSection from "../components/TitleSection/TitleSection";
import ListItems from "../components/ListItems/ListItems";
import Pagination from "../components/Pagination/Pagination";
import ReactGA from 'react-ga4';
import { AiOutlineFileSearch } from "react-icons/ai";

const  Docs = () => {

    const [loading, setLoading] = useState(true);
    const [articles, setArticles] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [articlesPerPage] = useState(8);
    const [filteredArticles, setFilteredArticles] = useState([]); // New state for filtered articles



    useEffect(() => {

        const fetchData = async () => {
          try {
    
            const response = await fetch(`https://ebureau.chambredesconseillers.ma/sielcc/api.php?endpoint=getAlbum&table=docs_cc_cr` ,{
            headers: {
              'Api-Key': '6c92e935dc096ab028081a1262e927cf3c10f6df8ccf247ba65821ca052a29ab',
            },
          });
            const result = await response.json();
    
            if (!result.error) {
              setArticles(result);
    
            }
    
            console.log(result)
          } catch (error) {
            console.error('Error fetching data:', error);
          } finally{
            setLoading(false);
    
          }
        };
    
        fetchData();
    
      }, []);


       // Filter articles based on the title
  useEffect(() => {
    setFilteredArticles(articles);
    setCurrentPage(1); // Reset to the first page after search
  }, [articles]);


  

// Pagination
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);



  // Handle page change
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);



  useEffect(() => {
    // Send pageview with a custom path
    ReactGA.send({ hitType: 'pageview', page: window.location.pathname ,title : "معرض الوثائق"});
}, [])





    return (
        <div className="container-content" >
         {/** <Breadcrumb_  title="معرض الوثائق" /> */}
        <TitleSection  animation='pulse' title_ar=" الذكرى الستين لتأسيس البرلمان المغربي" title_amz="ⴰⵣⵉⵖ ⵉ ⵜⵉⴷⵔⵔⴰⵏⵉⵜ ⵏ ⵉⵙⵎⴰⵔⴰⴱⵉ ⵜⵉⴷⴷⵉ ⵜⴰⵎⵎⵉⵜ" />
        <TitleSection  Icon_1={<AiOutlineFileSearch size={45} />} />
        <ListItems loading={loading} articles={currentArticles}  />

        <Pagination
        loading={loading}
        currentPage={currentPage}
        totalPages={Math.ceil(( filteredArticles.length) / articlesPerPage)}
        onPageChange={handlePageChange}
        />



        </div>
    )
}


export  default Docs;