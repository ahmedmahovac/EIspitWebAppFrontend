import { Button } from '@mui/material';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import Zoom from 'react-medium-image-zoom';
import styles from './UploadImages.module.css';


const UploadImageFromMobilePage = () => {
    const [selectedImages, setSelectedImages] = useState([]);
  

    const [selectedFilesForUpload, setSelectedFilesForUpload] = useState([]);

    const onSelectFile = (event) => {
      const selectedFiles = event.target.files;
  
      const image = URL.createObjectURL(selectedFiles[0]);
 
      setSelectedImages((previousImages) => previousImages.concat(image));
      setSelectedFilesForUpload(selectedFilesForUpload.concat(selectedFiles[0]));
      // FOR BUG IN CHROME
      event.target.value = "";
    };


    useEffect(()=>{
      console.log("uso");
      console.log(selectedFilesForUpload.length);
    }, [selectedFilesForUpload]);
  
    function deleteHandler(image) {
      setSelectedImages(selectedImages.filter((e) => e !== image));
    //  setSelectedFiles(selectedFiles.filter((e) => e !== image));
      URL.revokeObjectURL(image);
    }
  
    const handleUploadImages = (event) => {
      const formData = new FormData();
      selectedFilesForUpload.map((item)=>{
        formData.append("image", item);
      });
      
      axios.post("teacher/imageUpload",formData , {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then(res => {
        console.log("vraceno");
      }).catch(err => {
        console.log(err);
      });
    }

    return (
      <section>
        <label className={styles.uploadImageLabel}>
          + Add Images
          <br />
          <span>up to 10 images</span>
          <input
            className={styles.inputOdgovor}
            type="file"
            name="images"
            onChange={onSelectFile}
            accept="image/*"
            capture="environment"
          />
        </label>
        <br />
  
        <input className={styles.inputOdgovor} type="file" multiple />
  
        {selectedImages.length > 0 &&
          (selectedImages.length > 10 ? (
            <p className={styles.error}>
              You can't upload more than 10 images! <br />
              <span>
                please delete <b> {selectedImages.length - 10} </b> of them{" "}
              </span>
            </p>
          ) : (null))}
  
        <div className={styles.images}>
          {selectedImages &&
            selectedImages.map((image, index) => {
              console.log(image)
              return (
                <div key={image} className={styles.image}>
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
        <Button variant='contained' color='primary' onClick={handleUploadImages}>
          Upload images
        </Button>
      </section>
    );
  };


  export default UploadImageFromMobilePage;
  