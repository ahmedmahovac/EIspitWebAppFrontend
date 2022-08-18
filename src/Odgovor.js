import { Typography, Box, Collapse, IconButton } from '@mui/material';
import * as React from 'react';
import QRcode from 'qrcode.react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from 'react';
import Zoom from 'react-img-zoom';
export default function Odgovor() {

    const [open, setOpen] = useState(false);

    return(
        <Box>
            <Typography variant='subtitle1' sx={{
                color: "#22c1c3",
                fontWeight: "bold"
            }}>
                Generated qr code for images upload is available now
            </Typography>
            <Typography variant='subtitle2' sx={{
                color: "#22c1c3",
                fontWeight: "bold"
            }}>
                Upload answers to this question only!
            </Typography>
            <Box sx={{
              display: "flex",
              flexDireciton: "row",
              justifyContent: "left",
              alignItems: "center"
            }}>
            <IconButton
              aria-label="expand row"
              size="small"
              sx={{
                color: "#22c1c3"
              }}
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
            <Typography variant='subtitle1' sx={{fontWeight: "bold"}}>Show qr code</Typography>
            </Box>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <QRcode value='http://192.168.0.108:3000/uploadImages'/>
            </Collapse>
        </Box>
    );
}   