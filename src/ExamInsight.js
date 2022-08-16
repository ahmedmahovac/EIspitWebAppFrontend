import { Button, Collapse, Container, Grid, IconButton, ImageList, ImageListItem, Paper, TextField, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import Annotation from 'react-image-annotation';
import CreateIcon from '@mui/icons-material/Create';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box } from '@mui/system';
const itemData = [
    {
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      title: 'Breakfast',
      rows: 2,
      cols: 2,
    },
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
      cols: 2,
    }
]




export default function ExamInsight() {

    const [annotations, setAnnotations] = useState(itemData.map((item,index)=>{return [];}));

    const [openWritingComplaint, setOpenWritingComplaint] = useState(itemData.map((item,index)=>{return false;}));

    const [openImages, setOpenImages] = useState(false);


    const handleComplaintSubmit = (event) => {
        event.preventDefault();
        setOpenWritingComplaint(openWritingComplaint.map(item=>false));
    }

    return(
        <Container maxWidth="xl" component={Paper} sx={{marginTop: 5}}>
            <Box sx={{
              display: "flex",
              flexDireciton: "row",
              justifyContent: "center",
              alignItems: "center"
            }}>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpenImages(!openImages)}
            >
              {openImages ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
            <Typography variant='subtitle1'>Show images</Typography>
            </Box>
            <Collapse in={openImages} timeout="auto" unmountOnExit>
                <ImageList sx={{ width: "100%"}} cols={1}>
                        {itemData.map((item,index) => (
                                <ImageListItem key={item.img}>
                                <Annotation
                                    src={item.img}
                                    alt={item.title}
                                    annotations={annotations[index]}
                                    allowTouch
                                    disableAnnotation
                                    renderOverlay={() =>  (
                                        <div
                                        style={{
                                            background: 'rgba(0, 0, 0, 0.3)',
                                            color: 'white',
                                            padding: 5,
                                            pointerEvents: 'none',
                                            position: 'absolute',
                                            top: 5,
                                            left: 5
                                        }}
                                        >
                                        {"Image " + (index + 1)}
                                        </div>
                                    )}
                                />
                                <Paper sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center"
                                }}>
                                    <Box sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "right",
                                    alignItems: "center",
                                    width: "100%"
                                    }}>
                                    <Tooltip title="Write complaint">
                                        <IconButton size='large' disabled={openWritingComplaint[index]} onClick={()=>{
                                            let newArray = openWritingComplaint.map((item,i)=>{
                                                if(i===index) return true;
                                                else return false;
                                            });
                                            setOpenWritingComplaint(newArray);
                                        }}>
                                        <CreateIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    </Box>
                                    <Collapse in={openWritingComplaint[index]} timeout="auto" unmountOnExit>
                                        <Typography variant='h5'>
                                            Explain your complaint on comments found on this image
                                        </Typography>
                                        <Box component="form" onSubmit={handleComplaintSubmit} noValidate sx={{
                                            mt: 1, padding: "5px", width: "100%"
                                        }}>
                                            <TextField
                                            name='message'
                                            label="Poruka"
                                            fullWidth
                                            required
                                            id='contactArea'
                                            autoFocus
                                            multiline
                                            maxRows={Infinity}
                                            sx={{padding: "5px", marginTop: "10px"}}
                                            />
                                            <Button variant='contained' type='submit' fullWidth sx={{
                                                mt: 1, mb: 1
                                            }}>
                                                Submit
                                        </Button>
                                        </Box>  
                                    </Collapse>
                                </Paper>
                                </ImageListItem>
                        ))} 
                    </ImageList>
                </Collapse>
        </Container>
    );

}