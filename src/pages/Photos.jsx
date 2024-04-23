import React, { useState, useEffect } from 'react';
import TitleSection from '../components/TitleSection/TitleSection';
import Pagination from '../components/Pagination/Pagination';
import ListPhotos from '../components/ListPhotos/ListPhotos';
import ReactGA from 'react-ga4';

const CLIENT_ID = '3959137731-32skmad4s3k5b899v8cgqjbmot4gj801.apps.googleusercontent.com';
const REDIRECT_URI = 'http://localhost:5173/parlement/photos';
const AUTH_ENDPOINT = 'https://accounts.google.com/o/oauth2/auth';
const TOKEN_ENDPOINT = 'https://oauth2.googleapis.com/token';
const SCOPE = 'https://www.googleapis.com/auth/photoslibrary.readonly';
import { PiGooglePhotosLogo } from "react-icons/pi";
import LoadingBar from '../components/LoadingBar';

const Photos = () => {

  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [albumName, setAlbumName] = useState('siel_2024');


  const [currentPage, setCurrentPage] = useState(1);
  const [photosPerPage] = useState(33);
  const [filteredPhotos, setFilteredPhotos] = useState([]); // New state for filtered articles

  
  useEffect(() => {
    const fetchData = async () => {
      try {

        let accessToken = sessionStorage.getItem('access_token');
        if (!accessToken) {

          const urlParams = new URLSearchParams(window.location.hash.substring(1));
          accessToken = urlParams.get('access_token');
          const expiresIn = urlParams.get('expires_in');
          if (!accessToken || !expiresIn) {
            getAccessToken();
            return;
          }
          const expiresAt = Date.now() + parseInt(expiresIn) * 1000; // Convert expiresIn to milliseconds and add to current time
          sessionStorage.setItem('access_token', accessToken);
          sessionStorage.setItem('expires_at', expiresAt);
        } else {
          const expiresAt = sessionStorage.getItem('expires_at');
          if (Date.now() >= expiresAt) {
            sessionStorage.clear()
            getAccessToken();
            return;
          }
        }

        const albumId = await getAlbumId(accessToken, albumName);
        if (albumId) {
          const photosData = await getPhotos(accessToken, albumId);
          setPhotos(photosData);
        } else {
          setError(`Album "${albumName}" not found.`);
        }
      } catch (error) {
        setError('Error fetching data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [albumName]);


  useEffect(() => {
        setFilteredPhotos(photos);
        setCurrentPage(1); // Reset to the first page after search
   }, [photos]);
    
    

    // Pagination
    const indexOfLastArticle = currentPage * photosPerPage;
    const indexOfFirstArticle = indexOfLastArticle - photosPerPage;
    const currentPhotos = filteredPhotos.slice(indexOfFirstArticle, indexOfLastArticle);

    // Handle page change
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);


  const getAccessToken = async () => {
    
    const params = {
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      response_type: 'token',
      scope: SCOPE,
    };
    const queryString = Object.keys(params)
      .map((key) => `${key}=${encodeURIComponent(params[key])}`)
      .join('&');
    const authUrl = `${AUTH_ENDPOINT}?${queryString}`;

    window.location.href = authUrl;
    
  };


  const getAlbumId = async (access_token, albumName) => {
    // Construct the URL to fetch the list of albums
    const url = 'https://photoslibrary.googleapis.com/v1/albums';
  
    // Send a GET request to fetch the list of albums
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${access_token}`,
      },
    });
  
    // Parse the response as JSON
    const data = await response.json();
  
    // Search for the album with the specified name
    const album = data.albums.find(album => album.title === albumName);
  
    // Return the album ID if found, or null if not found
    return album ? album.id : null;
  };


  const getPhotos = async (access_token, albumId) => {
    let allMediaItems = []; // Array to store all media items
  
    let nextPageToken = null;
    do {
      // Construct the URL to fetch media items from the specified album
      const url = 'https://photoslibrary.googleapis.com/v1/mediaItems:search';
  
      // Set up the request body with the album ID as a filter
      const requestBody = {
        albumId: albumId,
        pageSize: 100, // Maximum number of items per page (adjust as needed)
        pageToken: nextPageToken,
      };
  
      // Send a POST request to search for media items in the album
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
  
      // Parse the response as JSON
      const data = await response.json();
  
      // Append the media items from the current page to the array
      allMediaItems = allMediaItems.concat(data.mediaItems);
  
      // Update nextPageToken for the next page (if available)
      nextPageToken = data.nextPageToken;
    } while (nextPageToken); // Continue fetching pages until nextPageToken is null
  
    // Return all media items
    return allMediaItems;
  };
  

  useEffect(() => {
    // Send pageview with a custom path
    ReactGA.send({ hitType: 'pageview', page: window.location.pathname ,title : "البوم الصور"});
}, [])


return (
  <div className="container-content">
    <TitleSection
      title_ar="مشاركة البرلمان في المعرض الدولي للنشر والكتاب: لحظات تاريخية"
      title_amz="ⴰⴳⵍⴰⴷⴰ ⵜⴰⵔⵢⴰⵏⵉⵏ ⴷ ⴱⵔⵍⵎⴰⵏ ⴻⴷ ⵜⴰⵡⵔⵉⵜ ⵉⵍⵍⴰⵎⵏ ⵜⴰⵔⵢⴰⵏⵉⵏ: ⵉⵎⵔⴰⵍⵜ ⵜⴰⵔⵢⴰⵏⵉⵏ."
    />
    <TitleSection Icon_1={<PiGooglePhotosLogo size={45} />} />

    {loading ? (
      <LoadingBar/>
    ) : error ? (
      <div>{error}</div>
    ) : (
      <>
        <ListPhotos photos={currentPhotos} />
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredPhotos.length / photosPerPage)}
          onPageChange={handlePageChange}
        />
      </>
    )}
  </div>
);

}
  

export default Photos;
