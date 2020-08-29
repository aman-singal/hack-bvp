import React from 'react'
import {TextField} from '@material-ui/core'

function VerifyMedication() {
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
