import { useEffect, useState } from "react";
import TitleSection from "../components/TitleSection/TitleSection";
import ListItems from "../components/ListItems/ListItems";
import Pagination from "../components/Pagination/Pagination";
import ReactGA from 'react-ga4';
import { AiOutlineFileSearch } from "react-icons/ai";
import LoadingBar from "../components/LoadingBar";

const Docs = () => {
    const [loading, setLoading] = useState(true);
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [articlesPerPage] = useState(8);
    const [filteredArticles, setFilteredArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch(`https://ebureau.chambredesconseillers.ma/sielcc/api.php?endpoint=getAlbum&table=docs_cc_cr`, {
                    headers: {
                        'Api-Key': '6c92e935dc096ab028081a1262e927cf3c10f6df8ccf247ba65821ca052a29ab',
                    },
                });
                const result = await response.json();
                if (!result.error) {
                    setArticles(result);
                    setFilteredArticles(result);
                }
                console.log(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchArticles();
    }, []);

    useEffect(() => {
        ReactGA.send({ hitType: 'pageview', page: window.location.pathname, title: "معرض الوثائق" });
    }, []);

    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container-content">
            <TitleSection animation='pulse' title_ar=" الذكرى الستين لتأسيس البرلمان المغربي" title_amz="ⴰⵣⵉⵖ ⵉ ⵜⵉⴷⵔⵔⴰⵏⵉⵜ ⵏ ⵉⵙⵎⴰⵔⴰⴱⵉ ⵜⵉⴷⴷⵉ ⵜⴰⵎⵎⵉⵜ" />
            <TitleSection Icon_1={<AiOutlineFileSearch size={45} />} />
            {loading ? <LoadingBar /> :  (
                <>
                    <ListItems type="صورة" articles={currentArticles} />
                    <Pagination
                        currentPage={currentPage}
                        totalPages={Math.ceil(filteredArticles.length / articlesPerPage)}
                        onPageChange={handlePageChange}
                    />
                </>
            
            )}
        </div>
    );
}

export default Docs;
