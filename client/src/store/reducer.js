import * as actions from './actionTypes'
import produce from "immer"

export default function reducer(state ={},action){
    let nextState;
    switch(action.type){
        case actions.PLAYER_SCORE:
             nextState = produce(state,draftState =>{
                draftState.playerScore = action.payload
            })
        return nextState

        case actions.DEALER_SCORE:
             nextState = produce(state,draftState =>{
                draftState.dealerScore = action.payload
            })
        return nextState

        case actions.PLAYER_DONE:
             nextState = produce(state,draftState =>{
                draftState.playerDone = action.payload
            })
        return nextState

        case actions.DEALER_DONE:
             nextState = produce(state,draftState =>{
                draftState.dealerDone = action.payload
            })
        return nextState

        case actions.WIN_STATUS:
             nextState = produce(state,draftState =>{
                draftState.winStatus = action.payload
            })
        return nextState

        case actions.MONEY:
             nextState = produce(state,draftState =>{
                draftState.money = action.payload
            })
        return nextState

        default:
            return state
    }

}