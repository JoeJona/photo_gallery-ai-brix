import { useEffect, useState } from 'react';
import './gallery.css';
import axios from 'axios'

function Gallery() {

  const [loading, setLoading] = useState([]);
  const [images, setImages] = useState([false]);
  const [errorMessage, setErrorMessage] = useState('');
  
  
  useEffect(() => {
    const getAllImages = async () => {
      try {
        const allImages = await axios.get('https://api.unsplash.com/photos?page=100&per_page=150&client_id=SE16Ng2YTGykJz_XFcNMmPjp40u4fL6lZbhw5zR6omU');
        console.log('Result ', allImages)
        setImages(allImages.data);

        setLoading(true);
        setTimeout(() => {
          setLoading(false)
        }, 2000)

      } catch (error) {
        console.log(error);
        setErrorMessage(error.message);
      }
    };
    
    getAllImages();
  }, [])

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
              <>
                {
                  loading ? 
                  <div className='loading'>
                    <h3>Images Loading ...</h3>
                  </div>
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
              </>  
          }
    </div>
  );
}

export default Gallery;
