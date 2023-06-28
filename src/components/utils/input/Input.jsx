import React from 'react';
import {TextField} from "@mui/material"


const Input = (props) => {
    return (
        <TextField fullWidth={true} margin='normal' id="outlined-basic" variant="outlined" onChange={(event)=> props.setValue(event.target.value)}
               value={props.value}
               type={props.type}
               placeholder={props.placeholder}/>
    );
};

export default Input;