import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Grid} from '@mui/material';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css'

export default function CardPitanje(props) {
    const handleBrokenImage = (event) => {
        event.target.style.display = "none";
    }
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
            <Grid container spacing={2}>
                {props.imageUrls.map((image, index)=>{
                    return (
                        <Grid item>
                            <Zoom>
                                <img height="100%" src={image}/> 
                            </Zoom>
                        </Grid> 
                    );
                })}
            </Grid>  
        </CardActionArea>
        </Card>
    );
}