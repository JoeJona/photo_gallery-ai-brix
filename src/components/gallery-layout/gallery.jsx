import { useEffect, useState } from 'react';
import './gallery.css';
import axios from 'axios'

function Gallery() {

  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');  
  
  useEffect(() => {
    const getAllImages = async () => {
      try {
        const allImages = await axios.get(`https://api.unsplash.com/photos?page=${page}&per_page=12&client_id=${process.env.REACT_APP_API_KEY}`);
        setImages((list) => [...list, ...allImages.data]);
        setLoading(true);
      } catch (error) {
        console.log(error);
        setErrorMessage(error.message);
      }
    };
    
    getAllImages();
  }, [page]);

  const handleScroll = () => {
    setTimeout(() => {
      if(window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
        setLoading(false);
        setPage((prev) => prev + 1);
      }
    }, 2000);
  }

  useEffect (() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
          { 
              errorMessage !== "" ?
              <>
                <div className='error'>
                  <h3>Something went wrong: {errorMessage}!</h3>
                </div>
              </>
          : 
              <div className='gallery-container'>
              { images.map(image => {
                return (
                  <div className="gallery-card">
                    <img src={image.urls.small} alt={image.alt_description} />
                    <span>{image.user.first_name} {image.user.last_name}</span>
                  </div>
                );
              }
              )}
              </div>                  
            }
            { loading && 
              <div className="loading">
                <h3>Loading ...</h3>
              </div>
            } 
    </div>
  );
}

export default Gallery;
