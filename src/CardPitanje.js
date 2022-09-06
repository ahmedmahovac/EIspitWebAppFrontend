import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Grid} from '@mui/material';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css'
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';


export default function CardPitanje(props) {

    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    const handleBrokenImage = (event) => {
        event.target.style.display = "none";
    }
    console.log(props);
    return (
        <Card sx={{width: "100%", mt: 5, backgroundColor: "#F9FDFF"}}>
        <CardActionArea>
            <CardContent>
            <Typography gutterBottom variant="h3" component="div" sx={{
                color: "#1976d2"
            }}>
                {props.title}
            </Typography>
            <Typography variant="body1" color="text.secondary">
                {props.text}
            </Typography>
            </CardContent>
            <Zoom>
                <img src={props.imageUrl} width="100%"/> 
            </Zoom>
            {props.pdf!==null&&(
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.min.js">
                <Viewer plugins={[defaultLayoutPluginInstance]} fileUrl={props.pdf} />;
            </Worker>
            )}
        </CardActionArea>
        </Card>
    );
}