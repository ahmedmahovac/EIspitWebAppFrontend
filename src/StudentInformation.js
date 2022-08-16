import { Box, IconButton, ImageList, ImageListItem, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { ExamContext } from './Exam';
import Annotation from 'react-image-annotation';
import {Collapse} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function StudentInformation() {

    const {students, selectedIndex} = useContext(ExamContext);
    const [open, setOpen] = useState(false);
    const itemData = [
        {
          img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
          title: 'Breakfast',
        },
        /*
        {
          img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
          title: 'Burger',
        },
        {
          img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
          title: 'Camera',
        },
        {
          img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
          title: 'Coffee',
        },
        {
          img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
          title: 'Hats',
        },
        {
          img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
          title: 'Honey',
        },
        {
          img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
          title: 'Basketball',
        },
        {
          img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
          title: 'Fern',
        },
        {
          img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
          title: 'Mushrooms',
        },
        {
          img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
          title: 'Tomato basil',
        },
        {
          img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
          title: 'Sea star',
        },
        {
          img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
          title: 'Bike',
        },
        */
      ];

      const [annotation, setAnnotation] = useState({});
      const [annotations, setAnnotations] = useState([]);
    
      const [clickedImage, setClickedImage] = useState(null);

      const onChange = (annotation) => {
        console.log(annotation.selection);
        setAnnotation(annotation);
      }
    
      const onSubmit = (annotation) => {
        const { geometry, data } = annotation

        setAnnotation([]);
        setAnnotations(annotations.concat({
            geometry,
            data: {
              ...data,
              id: Math.random()
            }
          }));
      }

      useEffect(()=>{console.log(clickedImage)}, [clickedImage]);

    return(
        <Box>
          <Paper>
            <Typography variant='h4'>{students[selectedIndex].firstName + ' ' + students[selectedIndex].lastName}</Typography>
            <Typography variant='subtitle1'></Typography>
            <Typography variant='subtitle1'>{students[selectedIndex].email}</Typography>
            <Typography variant='subtitle1'>{students[selectedIndex].index}</Typography>
          </Paper>
          <Box component={Paper} sx={{
            marginTop: 1
          }}>
            <Box sx={{
              display: "flex",
              flexDireciton: "row",
              justifyContent: "center",
              alignItems: "center"
            }}>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
            <Typography variant='subtitle1'>Show student answer</Typography>
            </Box>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <ImageList sx={{ width: "100%"}} cols={1}>
                    {itemData.map((item,index) => (
                            <ImageListItem key={item.img} onClick={(event)=>{setClickedImage(index)}}>
                            <Annotation
                                src={item.img}
                                alt={item.title}
                                annotations={annotations}
                                value={annotation}
                                onChange={onChange}
                                onSubmit={onSubmit}
                                allowTouch
                            />
                            </ImageListItem>
                    ))} 
                </ImageList>
              </Collapse>
          </Box>
        </Box>
    );
}