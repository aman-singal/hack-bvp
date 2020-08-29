import React from 'react'
import {TextField , Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root:{
        justifyContent: 'center',
        display: 'flex',
    }
  });

function VerifyStatus() {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <TextField 
            id="outlined-basic" 
            label="Enter Aadhar Number" 
            variant="outlined"
            autoFocus={true}
            type='number'
             />
             <Button variant="contained" color="primary">Add New Patient</Button>
        </div>
    )
}

export default VerifyStatus
