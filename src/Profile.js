import React from "react";
import { userContext } from "./App";
import { useContext } from "react";
import { Box, Button, Collapse, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from "axios";

export default function Profile() {

    const {user} = useContext(userContext);

    const [changePasswordTriggered, setChangePasswordTriggered] = useState(false);

    const [newPasswordAdded, setNewPasswordAdded] = useState(false);

    const [errors, setErrors] = useState("");

    const formik = useFormik({
        initialValues: {
          oldPassword: '',
          newPassword: ''
        },
        validationSchema: Yup.object({
          oldPassword: Yup.string().required('Old password is required'),
          newPassword: Yup.string().required("New password is required").min(6, 'Password is too short - should be 8 chars minimum.').matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
        }),
        onSubmit: values => {
            console.log(user)
            axios.post("/updatePassword", {...values, user: user.name}).then((res)=>{
                const status = res.status;
                setNewPasswordAdded(true); // mozda da redirectam na login page i odjavim ga
                setErrors("");
            }).catch(err => {
                if(err.response){
                    if(err.response.status===401) setErrors('Invalid credentials.')
                    else setErrors('Error. Please try again.')
                    setNewPasswordAdded(false);
                }
            });
        },
      });

    return(
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 5
        }}>
            <Typography>{user.name}</Typography>
            <Button disabled={changePasswordTriggered} color="primary" variant="contained" onClick={(event)=>setChangePasswordTriggered(true)}>Change password</Button>
            <Collapse in={changePasswordTriggered} timeout="auto" unmountOnExit>
                <Paper noValidate component="form" onSubmit={formik.handleSubmit} sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 1
                }}>
                    <TextField
                    margin="normal"
                    fullWidth
                    id="oldPassword"
                    label="Old password"
                    name="oldPassword"
                    autoComplete="current-password"
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.oldPassword}
                    sx={{padding: "5px"}}
                    />
                    {formik.touched.oldPassword && formik.errors.oldPassword ? (<Typography variant='subtitle2' sx={{color: "#ff355e"}}>{formik.errors.oldPassword}</Typography>) : null}
                    <TextField
                    margin="normal"
                    fullWidth
                    id="newPassword"
                    label="New password"
                    name="newPassword"
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.newPassword}
                    sx={{padding: "5px"}}
                    />
                    {formik.touched.newPassword && formik.errors.newPassword ? (<Typography variant='subtitle2' sx={{color: "#ff355e"}}>{formik.errors.newPassword}</Typography>) : null}
                    <Button variant="contained" color="primary" type="submit" sx={{m: 1}}>SUBMIT</Button>
                    {errors.length!=0 ? <Typography variant='subtitle1' sx={{color: "#ff355e", marginTop: 2, fontWeight: "bold"}}>{errors}</Typography> : null}
                    {newPasswordAdded ? <Typography variant='subtitle1' sx={{color: "#22c1c3", marginTop: 2, fontWeight: "bold"}}>Password change successful.</Typography> : null}
                </Paper>
            </Collapse>
        </Box>
    );
}