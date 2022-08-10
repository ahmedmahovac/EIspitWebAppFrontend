import React, {useState} from 'react';
import Zoom from 'react-medium-image-zoom';
import './UploadImageFromMobilePage.css';

const UploadImageFromMobilePage = () => {
    const [selectedImages, setSelectedImages] = useState([]);
  
    const onSelectFile = (event) => {
      const selectedFiles = event.target.files;
  
      const image = URL.createObjectURL(selectedFiles[0]);
  
      setSelectedImages((previousImages) => previousImages.concat(image));
  
      // FOR BUG IN CHROME
      event.target.value = "";
    };
  
    function deleteHandler(image) {
      setSelectedImages(selectedImages.filter((e) => e !== image));
      URL.revokeObjectURL(image);
    }
  
    return (
      <section>
        <label className='uploadImageLabel'>
          + Add Images
          <br />
          <span>up to 10 images</span>
          <input
            className='inputOdgovor'
            type="file"
            name="images"
            onChange={onSelectFile}
            accept="image/*"
            capture="environment"
          />
        </label>
        <br />
  
        <input className='inputOdgovor' type="file" multiple />
  
        {selectedImages.length > 0 &&
          (selectedImages.length > 10 ? (
            <p className="error">
              You can't upload more than 10 images! <br />
              <span>
                please delete <b> {selectedImages.length - 10} </b> of them{" "}
              </span>
            </p>
          ) : (null))}
  
        <div className="images">
          {selectedImages &&
            selectedImages.map((image, index) => {
              return (
                <div key={image} className="image">
                  <Zoom>
                     <img src={image} height="200" alt="upload" />
                  </Zoom>
                  <button onClick={() => deleteHandler(image)}>
                    delete image
                  </button>
                  <p>{index + 1}</p>
                </div>
              );
            })}
        </div>
      </section>
    );
  };


  export default UploadImageFromMobilePage;
  