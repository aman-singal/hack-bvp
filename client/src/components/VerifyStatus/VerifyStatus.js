import React from 'react'
import {TextField , Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import store from '../../store/store'
import * as actions from '../../store/actionTypes'
import {useLayoutEffect} from 'react';


const useStyles = makeStyles({
    root:{
        justifyContent: 'center',
        display: 'flex',
    }
  });

function VerifyStatus() {
    const classes = useStyles()
    useLayoutEffect(() => {
        store.dispatch({type: actions.APPBAR_TITLE , payload: 'Verify Status'})
    }, [])

    return (
        <div className={classes.root}>
            <TextField 
            id="outlined-basic" 
            label="Enter Unique Number" 
            variant="outlined"
            autoFocus={true}
            type='number'
             />
             <Button variant="contained" color="primary"> Verify Status</Button>
        </div>
    )
}

export default VerifyStatus
