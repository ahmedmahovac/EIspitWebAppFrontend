import { Typography, Box } from '@mui/material';
import * as React from 'react';
import QRcode from 'qrcode.react';

export default function Odgovor() {
    return(
        <Box>
            <Typography variant='subtitle1' sx={{
                color: "#22c1c3"
            }}>
                Prostor za odgovor:
            </Typography>
            <h1> Ahmedeeee </h1>
            <QRcode value='http://192.168.0.108:3000/uploadImage'>

            </QRcode>
        </Box>
    );
}   