// Container.jsx
import  { useState, useEffect } from 'react';
import { useParams ,useNavigate } from 'react-router-dom';
import ArticleList from '../ArticleList/ArticleList';
import Pagination from '../Pagination/Pagination';
import SearchForm from '../SearchForm/SearchForm';
import Breadcrumb_ from '../Breadcrumb/Breadcrumb_';
import TitleSection from '../TitleSection/TitleSection';
import './Container.css'

const Container = () => {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);


  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(18);
  const [searchTerm, setSearchTerm] = useState(''); // Add state for search term
  const [filteredArticles, setFilteredArticles] = useState([]); // New state for filtered articles

  const { title } = useParams();
  const table = (title === "إصدارات مجلس النواب" ? "publications_cr" : "publications_cc")
  const navigate = useNavigate();
  


  console.log("reload")
  
 
  useEffect(() => {
      if (!["إصدارات مجلس النواب","إصدارات مجلس المستشارين"].includes(title)) {
        // Redirect to the home route
        navigate('/');
      }
  }, [title, navigate]);

 
  useEffect(() => {

    const fetchData = async () => {
      try {

        const response = await fetch(`https://ebureau.chambredesconseillers.ma/sielcc/api.php?endpoint=getPublications&table=${table}` ,{
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

  }, [title,table]);


  // Filter articles based on the title
  useEffect(() => {

    const filtered = articles.filter((article) =>
      article.title.toLowerCase().includes(searchTerm.trim().toLowerCase())
    );

    setFilteredArticles(filtered);
    setCurrentPage(1); // Reset to the first page after search
  }, [articles, searchTerm]);


 // Pagination
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);


  // Handle page change
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
    // Handle search
    const handleSearch = (searchTerm) => {
      setSearchTerm(searchTerm);
    };



 


  return (
    
    <div className='container-content' >
      <Breadcrumb_  title={title} />
      <TitleSection title_ar="قائمة الإصدارات" title_amz="ⵜⴰⵍⴳⴰⵎⵜ ⵏ ⵜⵥⵕⵉⴳⵉⵏ" />
      <SearchForm onSearch={handleSearch} />
      <ArticleList loading={loading} articles={currentArticles} searchTerm={searchTerm} />
      <Pagination 
        loading={loading}
        currentPage={currentPage}
        totalPages={Math.ceil(( filteredArticles.length) / articlesPerPage)}
        onPageChange={handlePageChange}
      />
    </div>


  );
};

export default Container;
