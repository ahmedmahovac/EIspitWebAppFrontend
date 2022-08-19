import { Box, Button, Collapse, Container, Grid, IconButton, Input, Paper, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import loadImage from "blueimp-load-image";
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import CloudDoneIcon from '@mui/icons-material/CloudDone';

export default function UploadImagesExtra() {
 
    const [selectedImages, setSelectedImages] = useState([]);

    const onSelectFile = (event) => {
        const selectedFiles = event.target.files;
        loadImage(selectedFiles[0], {noRevoke: true, canvas: true}).then((data)=>{// ovo je isto sporo. Ima tamo nekih metoda u blueimp docs s kojima se moze prikazat proces loadanja slike
            setSelectedImages(selectedImages.concat(data.image));
        })
    }



    const handleRotationRight = (event) => {
        let transformedImage = loadImage.scale(selectedImages[selectedImages.length-1], {noRevoke: true, orientation: 6, canvas: true});
        setSelectedImages(selectedImages.slice(0,-1).concat(transformedImage)); // ovo je prilicno spora operacija, zato je bolje imat neku trenutnu sliku i samo sa njom manipulisat dok se transformacija ne potvrdi
    }

    const handleRotationLeft = (event) => {
        let transformedImage = loadImage.scale(selectedImages[selectedImages.length-1], {noRevoke: true, orientation: 8, canvas: true});
        setSelectedImages(selectedImages.slice(0,-1).concat(transformedImage));
    }


    return(
        <Container maxWidth="xl">
            <Input
            type="file"
            onChange={onSelectFile}
            inputProps={{
            name: "images",
            accept: "image/*",
            capture: "environment"
            }} 
            >
            </Input>
            {selectedImages.length != 0 && 
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <img src={selectedImages[selectedImages.length-1].toDataURL()}/> 
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center"
                }}> 
                    <Tooltip title="Rotate left">
                        <IconButton onClick={handleRotationLeft}>
                            <RotateLeftIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Rotate right">
                        <IconButton onClick={handleRotationRight}>
                            <RotateRightIcon/>
                        </IconButton>
                    </Tooltip>
                </Box>
                <Grid container spacing={2}>
                    {selectedImages.map((item, index)=>{
                        if(index===selectedImages.length-1) return null;
                        return (
                           <Grid item>
                                <img height="200" src={item.toDataURL()}/> 
                           </Grid> 
                        );
                    })}
                </Grid>
            </Box>
            }
        </Container>
    );
}