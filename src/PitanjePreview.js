import { Box, Paper, Tooltip, Typography } from '@mui/material';
import { Component, useContext, useEffect, useState } from 'react';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import ImageIcon from '@mui/icons-material/Image';


export default function PitanjePreview(props) {
    return(
        <Paper square sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            backgroundColor: "lightblue",
            padding: "5px",
            margin: "5px"
        }}>
            <Tooltip title="PDF file is present.">
                <PictureAsPdfIcon fontSize='large' color={props.pdf !== null ? 'success' : 'primary'} sx={{marginLeft: 2, marginRight: 2}}/>
            </Tooltip>
            <Tooltip title="Question text is present.">
                <FormatColorTextIcon fontSize='large' color={props.questionText.length!==0 ? 'success' : 'primary'} sx={{marginLeft: 2, marginRight: 2}}/>
            </Tooltip>
            <Tooltip title="Images are present.">
                <ImageIcon fontSize='large' color={props.images.length!==0 ? 'success' : 'primary'} sx={{marginLeft: 2, marginRight: 2}}/>
            </Tooltip>
            <Typography variant='subtitle1' sx={{marginLeft: "auto", fontWeight: "bold"}}>{props.title}</Typography>
        </Paper>
    );
}