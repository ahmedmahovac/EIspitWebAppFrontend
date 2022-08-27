import { Button } from '@mui/material';
import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import Zoom from 'react-medium-image-zoom';
import styles from './UploadImages.module.css';
import { NewExamContext } from './NewExam';

const UploadImageFromMobilePage = () => {
   // const [selectedImages, setSelectedImages] = useState([]);
  

    const {selectedFilesForUpload, setSelectedFilesForUpload} = useContext(NewExamContext);

    const onSelectFile = (event) => {
      const selectedFiles = event.target.files;
  
     // const image = URL.createObjectURL(selectedFiles[0]);
 
     // setSelectedImages((previousImages) => previousImages.concat(image));
      setSelectedFilesForUpload(selectedFilesForUpload.concat(selectedFiles[0]));
      // FOR BUG IN CHROME
      event.target.value = "";
    };


  
    function deleteHandler(imageFile, image) {
     // setSelectedImages(selectedImages.filter((e) => e !== image));
     setSelectedFilesForUpload(selectedFilesForUpload.filter((e) => e !== imageFile));
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
          <span>up to 1 images</span>
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
  
        {selectedFilesForUpload.length > 0 &&
          (selectedFilesForUpload.length > 1 ? (
            <p className={styles.error}>
              You can't upload more than 1 images! <br />
              <span>
                please delete <b> {selectedFilesForUpload.length - 1} </b> of them{" "}
              </span>
            </p>
          ) : (null))}
  
        <div className={styles.images}>
          {selectedFilesForUpload &&
            selectedFilesForUpload.map((imageFile, index) => {
              const image = URL.createObjectURL(imageFile);
              return (
                <div key={image} className={styles.image}>
                  <Zoom>
                     <img src={image} height="200" alt="upload" />
                  </Zoom>
                  <button onClick={() => deleteHandler(imageFile, image)}>
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
  