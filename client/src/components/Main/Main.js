import React from 'react'
import store from '../../store/store'
import * as actions from '../../store/actionTypes'
import {useLayoutEffect} from 'react';

function Main() {
    useLayoutEffect(() => {
        store.dispatch({type: actions.APPBAR_TITLE , payload: 'HomePage'})
    }, [])
    return (
        <div>
            This is a project
        </div>
    )
}

export default Main
