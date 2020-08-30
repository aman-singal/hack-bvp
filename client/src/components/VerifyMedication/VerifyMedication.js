import React from 'react'
import {TextField} from '@material-ui/core'
import store from '../../store/store'
import * as actions from '../../store/actionTypes'
import {useLayoutEffect} from 'react';

function VerifyMedication() {
    useLayoutEffect(() => {
        store.dispatch({type: actions.APPBAR_TITLE , payload: 'Verify Medication'})
      }, [])
    return (
        <div>
            <TextField 
            id="outlined-basic" 
            label="Enter Unique Number" 
            variant="outlined"
            autoFocus={true}
            type='number'
             />
        </div>
    )
}

export default VerifyMedication
