import axios from "axios";
import * as actions from '../api'

const action = {
    type: actions.apiCallBegan,
    payload:{
        url:'/bugs',
        method:'get',
        data:{},
        onSuccess: actions.apiCallSuccess,
        onError: actions.apiCallFailed
    }
}


const api = ({dispatch}) => next=> async action => {
    if(action.type !== actions.apiCallBegan.type){
        return next(action)
    }

    const{url, method,data,onSuccess, onStart, onError} = action.payload

    if(onStart){
        dispatch({type: onStart});
    }

    next(action);

    try{
        const response = await axios.request({
            baseURL: 'http://localhost:9001/api',
            url,
            method,
            data,
        });

        dispatch(actions.apiCallSuccess(response.data));
        if(onSuccess){
            dispatch(
                {
                    type:onSuccess, 
                    payload:response.data
                }
            )
        }

    }catch(error){

        dispatch(actions.apiCallFailed(error.message));

        if(onError){
            dispatch(
                {
                    type:onError, 
                    payload:error.message
                }
                )
        }
        
    }

}
export default api;