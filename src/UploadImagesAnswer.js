import { Box, Button, Collapse, Container, Grid, IconButton, Input, Paper, Tooltip } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import loadImage from "blueimp-load-image";
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import { userContext } from './App';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


export default function UploadImagesExtra() {
 
    const {examTakeId} = useContext(userContext);

    const navigate = useNavigate();

    const {questionId, examTake} = useParams();

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

    useEffect(()=>{
        /*if(examTakeId !== examTake) { // na mobitelu ovo nece proc jer prvi put pristupamo aplikaciji, ne mozes ovo onemogucit
            alert("You have no rights to access this route!");
            navigate("../../../home");
        }
        */
       // ali ovako kad student vidi url, moze bilo ko uc na url i upload rjesenja. Sakrij nesto iz urla il omoguci neku dodatnu provjeru npr kad se submita slanje rjesenja
    }, []);


    const handleSubmitImages = (event) => {
        // provjeri jel okej da ovaj koji trenutno salje slike to uradi
        // posalji neki indikator na frontend ispita da potvrdi
        // kasnije cu to
        axios.post("/student/answer/"+questionId + "/" + examTake).then(res => { // ovo examTake je iz parametara urla
            // sada uploaduj slike odgovora
            const formData = new FormData();
            var myBlob = new Blob(["This is my blob content"], {type : "image/png"});
            selectedImages.map((canvas,index)=>{
                canvas.toBlob((blob)=>{
                    console.log(blob);
                    if(blob!=null){
                        formData.append("imageAnswer", blob); // ovo je sad blob koji je nesto poput file objekta
                        if(index===selectedImages.length-1){
                            // svi su uspjesno appendovani, sada mogu poslat formData
                            formData.append("answerId", res.data.answerId);
                            axios.post("/student/answerImages",formData,{headers: {"Content-Type": "multipart/form-data"}}).then(res => {
                                console.log(res);
                            }).catch(err => {
                                console.log(err);
                            });
                        }
                    }
                    else {
                        console.log("This canvas cant be converted to blob!");
                    }
                });
            });

        }).catch(err => {
            console.log(err);
        });
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
            {selectedImages.length !== 0 && 
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
                           <Grid key={index} item>
                                <img height="200" src={item.toDataURL()}/> 
                           </Grid> 
                        );
                    })}
                </Grid>
                <Button onClick={handleSubmitImages} variant='contained' color='primary' sx={{
                    margin: 1
                }}>
                    Submit
                </Button>
            </Box>
            }
        </Container>
    );
}