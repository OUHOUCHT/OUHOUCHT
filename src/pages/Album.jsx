import React, { useState, useEffect } from "react";
import ReactGA from 'react-ga4';
import { TbPhotoStar } from "react-icons/tb";
import ListItems from "../components/ListItems/ListItems";
import TitleSection from "../components/TitleSection/TitleSection";
import Pagination from "../components/Pagination/Pagination";
import LoadingBar from "../components/LoadingBar";

const Album = () => {
    const [loading, setLoading] = useState(true);
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 8;
    const [filteredArticles, setFilteredArticles] = useState([]);

    // Fetch articles from the API
    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch(
                    `https://ebureau.chambredesconseillers.ma/sielcc/api.php?endpoint=getAlbum&table=album_cc_cr`,
                    {
                        headers: {
                            'Api-Key': '6c92e935dc096ab028081a1262e927cf3c10f6df8ccf247ba65821ca052a29ab',
                        },
                    }
                );
                const result = await response.json();
                if (!result.error) {
                    setArticles(result);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchArticles();
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

    // Send pageview with a custom path
    useEffect(() => {
        ReactGA.send({ hitType: 'pageview', page: window.location.pathname, title: "معرض الصور" });
    }, []);

    return (
        <div className="container-content">
            <TitleSection animation='pulse' title_ar=" الذكرى الستين لتأسيس البرلمان المغربي" title_amz="ⴰⵣⵉⵖ ⵉ ⵜⵉⴷⵔⵔⴰⵏⵉⵜ ⵏ ⵉⵙⵎⴰⵔⴰⴱⵉ ⵜⵉⴷⴷⵉ ⵜⴰⵎⵎⵉⵜ" />
            <TitleSection Icon_1={<TbPhotoStar size={40} />} />
            {loading ? (
                <LoadingBar /> // Show loading spinner while data is being fetched
            ) : (
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
};


export default Album;
